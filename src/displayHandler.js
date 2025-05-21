import ProjectDisplayer from "./displayers/projectDisplayer";
import SidebarDisplayer from "./displayers/sidebarDisplayer";
import Project from "./todo-project/project";
import TodoItem from "./todo-project/todo-item";

export default class DisplayHandler
{
    #user;
    #selectedProject;

    #sidebarDisplayer;
    #projectDisplayer;

    constructor(document, user)
    {
        this.#user = user;

        if (this.#user.projects.length === 0)
        {
            this.#user.addProject(Project.makeDefault());
        }

        this.#selectedProject = this.#user.projects[0].id;

        const sidebarContainer = document.querySelector("#sidebar");
        this.#sidebarDisplayer = new SidebarDisplayer(document, sidebarContainer);

        const projectContainer = document.querySelector("#project-display");
        this.#projectDisplayer = new ProjectDisplayer(document, projectContainer);

        this.#setSidebarListeners();
        this.#setProjectListeners();
    }

    display()
    {
        this.#sidebarDisplayer.show(this.#user);
    }

    #setSidebarListeners()
    {
        this.#sidebarDisplayer.userNameChangeListener = (newName) => { this.#user.name = newName };
        this.#sidebarDisplayer.addProjectListener = () => { this.#user.addProject(Project.makeDefault()) };
        this.#sidebarDisplayer.selectActiveProjectListener = (projectId) => { this.#onProjectSelected(projectId) };
    }

    #setProjectListeners()
    {
        this.#projectDisplayer.projectNameChangedListener = (newName) => { this.#onProjectNameChanged(newName) };
        this.#projectDisplayer.projectDescriptionChangedListener = (newDescription) => { this.#user.updateProjectDescription(this.#selectedProject, newDescription) };
        this.#projectDisplayer.projectRemoveListener = _ => { this.#onProjectRemoved() };
        this.#projectDisplayer.addTodoListener = _ => { this.#onAddTodo() };
        this.#projectDisplayer.todoValidateChangedListener = (checked, todoId) => { this.#onTodoValidateChanged(checked, todoId) };
        this.#projectDisplayer.todoNameChangedListener = (todoId, newName) => { this.#user.getProject(this.#selectedProject).getTodoList(todoId).title = newName };
        this.#projectDisplayer.todoPriorityChanged = (todoId, newPriority) => { this.#onTodoPriorityChanged(todoId, newPriority) };
    }

    #onProjectSelected(projectId)
    {
        this.#selectedProject = projectId;
        this.#projectDisplayer.show(this.#user.getProject(projectId));
    }

    #onProjectNameChanged(newName)
    {
        this.#user.updateProjectName(this.#selectedProject, newName);
        this.#sidebarDisplayer.show(this.#user);
    }

    #onProjectRemoved()
    {
        this.#user.removeProject(this.#selectedProject);
        
        if (this.#user.projects.length === 0)
        {
            this.#user.addProject(Project.makeDefault());
        }

        this.#sidebarDisplayer.show(this.#user);
    }

    #onAddTodo()
    {
        this.#user.getProject(this.#selectedProject).addTodoList(TodoItem.makeDefault());
        this.#projectDisplayer.show(this.#user.getProject(this.#selectedProject));
    }

    #onTodoValidateChanged(checked, todoId)
    {
        const project = this.#user.getProject(this.#selectedProject);
        project.validateTodoList(todoId, checked);
        this.#projectDisplayer.show(project);
    }

    #onTodoPriorityChanged(todoId, priority)
    {
        const project = this.#user.getProject(this.#selectedProject);
        project.setTodoPriority(todoId, priority);
        this.#projectDisplayer.show(project);
    }
}