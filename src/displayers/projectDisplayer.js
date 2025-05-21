import Select from "../utility/select";
import TextBox from "../utility/textBox";
import DisplayerBase from "./displayerBase";

export default class ProjectDisplayer extends DisplayerBase
{
    projectNameChangedListener;
    projectDescriptionChangedListener;
    projectRemoveListener;
    addTodoListener;
    todoValidateChangedListener;
    todoNameChangedListener;
    todoPriorityChanged;

    constructor(document, projectContainer)
    {
        super(document, projectContainer);

        this.projectNameChangedListener = null;
        this.projectDescriptionChangedListener = null;
        this.projectRemoveListener = null;
        this.addTodoListener = null;
        this.todoValidateChangedListener = null;
        this.todoNameChangedListener = null;
    }

    #showProjectHeader(project)
    {
        const projectHeader = this._document.createElement("div");
        projectHeader.classList.add("project-header");

        const projectNameHeader = this._document.createElement("div");
        projectNameHeader.classList.add("project-name-header");

        const projectNameTextBox = new TextBox(
            this._document,
            project.title,
            ["project-name"]
        );
        projectNameTextBox.contentChangedListener = (newName) => { this._invokeListener(this.projectNameChangedListener, newName) };

        const editProjectName = this._document.createElement("button");
        editProjectName.classList.add("edit-project-name");
        editProjectName.addEventListener("click", _ => projectNameTextBox.startEdit());

        const editProjectNamePicture = this._document.createElement("div");

        const projectDescTextBox = new TextBox(
            this._document,
            project.description,
            ["project-desc"],
            true
        );
        projectDescTextBox.contentChangedListener = (newDesc) => { this._invokeListener(this.projectDescriptionChangedListener, newDesc) };

        const removeProject = this._document.createElement("button");
        removeProject.classList.add("remove-project");
        removeProject.addEventListener("click", _ => { this._invokeListener(this.projectRemoveListener) });

        const removeProjectPicture = this._document.createElement("div");
        
        removeProject.appendChild(removeProjectPicture);

        editProjectName.appendChild(editProjectNamePicture);

        projectNameTextBox.setParent(projectNameHeader);
        projectNameHeader.appendChild(editProjectName);

        projectHeader.appendChild(projectNameHeader);
        projectDescTextBox.setParent(projectHeader);
        projectHeader.appendChild(removeProject);

        this._container.appendChild(projectHeader);
    }

    #showListTodoHeader()
    {
        const listTodoHeader = this._document.createElement("div");
        listTodoHeader.classList.add("list-todo-header");

        const title = this._document.createElement("h2");
        title.textContent = "Todo";

        const addButton = this._document.createElement("button");
        addButton.classList.add("button-add-todo");
        addButton.addEventListener("click", _ => { this._invokeListener(this.addTodoListener) });

        const addButtonImg = this._document.createElement("div");

        addButton.appendChild(addButtonImg);

        listTodoHeader.appendChild(title);
        listTodoHeader.appendChild(addButton);

        this._container.appendChild(listTodoHeader);
    }

    #showTodoList(project)
    {
        const listTodo = this._document.createElement("ul");
        listTodo.classList.add("list-todo");

        const projectTodoList = project.todoList;
        for (let i = 0; i < projectTodoList.length; ++i)
        {
            const todo = projectTodoList.at(i);
            const todoElement = this.#createTodo(todo);
            listTodo.appendChild(todoElement);
        }

        this._container.appendChild(listTodo);
    }

    #createTodo(currentTodo)
    {
        const todo = this._document.createElement("li");
        todo.classList.add("todo");

        this.#createTodoHeader(currentTodo, todo);
        this.#createTodoOptions(currentTodo, todo);

        return todo;
    }

    #createTodoHeader(currentTodo, todoContainer)
    {
        const todoHeader = this._document.createElement("div");
        todoHeader.classList.add("todo-header");

        const todoExpand = this._document.createElement("button");
        todoExpand.classList.add("todo-expand");

        const todoExpandImg = this._document.createElement("div");

        const validate = this._document.createElement("input");
        validate.checked = currentTodo.content.checked;
        validate.type = "checkbox";
        validate.addEventListener("change", _ => { this._invokeListener(this.todoValidateChangedListener, validate.checked, currentTodo.id) });

        const todoNameHeader = this._document.createElement("div");
        todoNameHeader.classList.add("todo-name-header");

        const todoName = new TextBox(
            this._document,
            currentTodo.content.title,
            ["todo-name"]
        );
        todoName.contentChangedListener = (newName) => { this._invokeListener(this.todoNameChangedListener, currentTodo.id, newName) };

        const todoNameEdit = this._document.createElement("button");
        todoNameEdit.classList.add("todo-name-edit");
        todoNameEdit.addEventListener("click", _ => { todoName.startEdit() });

        const todoNameEditImg = this._document.createElement("div");

        todoExpand.appendChild(todoExpandImg);

        todoNameEdit.appendChild(todoNameEditImg);

        todoName.setParent(todoNameHeader);
        todoNameHeader.appendChild(todoNameEdit);

        todoHeader.appendChild(todoExpand);
        todoHeader.appendChild(validate);
        todoHeader.appendChild(todoNameHeader);

        todoContainer.appendChild(todoHeader);
    }

    #createTodoOptions(currentTodo, todoContainer)
    {
        const todoOptions = this._document.createElement("div");
        todoOptions.classList.add("todo-options");

        const progressBar = this._document.createElement("progress");
        progressBar.value = currentTodo.content.progress;

        const priority = new Select(
            this._document,
            [
                Select.createOption("0", "Very Low"),
                Select.createOption("1", "Low"),
                Select.createOption("2", "Normal"),
                Select.createOption("3", "High"),
                Select.createOption("4", "Very High")
            ],
            [],
            currentTodo.content.priority
        );
        priority.changeSelectionListener = newSelection => { this._invokeListener(this.todoPriorityChanged, currentTodo.id, newSelection) };

        const todoDeadline = this._document.createElement("input");
        todoDeadline.class = "todo-deadline";
        todoDeadline.type = "date";
        //todoDeadline.valueAsDate = currentTodo.todo.dueDate;

        todoOptions.appendChild(progressBar);
        priority.setParent(todoOptions);
        todoOptions.appendChild(todoDeadline);

        todoContainer.appendChild(todoOptions);
    }

    show(project)
    {
        super.show();

        this.#showProjectHeader(project);
        this.#showListTodoHeader();
        this.#showTodoList(project);
    }
}