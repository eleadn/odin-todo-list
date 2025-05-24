import ProjectDisplayer from "./displayers/projectDisplayer";
import SidebarDisplayer from "./displayers/sidebarDisplayer";
import SaveManager from "./saveManager/saveManager";
import Project from "./todo-project/project";
import TodoItem from "./todo-project/todo-item";
import { parse } from "date-fns";

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
        this.#sidebarDisplayer.userNameChangeListener = (newName) => { this.#onUserNameChanged(newName) };
        this.#sidebarDisplayer.addProjectListener = () => { this.#onAddProject() };
        this.#sidebarDisplayer.selectActiveProjectListener = (projectId) => { this.#onProjectSelected(projectId) };
    }

    #setProjectListeners()
    {
        this.#projectDisplayer.projectNameChangedListener = (newName) => { this.#onProjectNameChanged(newName) };
        this.#projectDisplayer.projectDescriptionChangedListener = (newDescription) => { this.#onProjectDescriptionChanged(newDescription) };
        this.#projectDisplayer.projectRemoveListener = _ => { this.#onProjectRemoved() };
        this.#projectDisplayer.addTodoListener = _ => { this.#onAddTodo() };
        this.#projectDisplayer.todoValidateChangedListener = (checked, todoId) => { this.#onTodoValidateChanged(checked, todoId) };
        this.#projectDisplayer.todoNameChangedListener = (todoId, newName) => { this.#onTodoNameChanged(todoId, newName) };
        this.#projectDisplayer.todoPriorityChangedListener = (todoId, newPriority) => { this.#onTodoPriorityChanged(todoId, newPriority) };
        this.#projectDisplayer.todoDueDateChangedListener = (todoId, newDate) => { this.#onTodoDueDateChanged(todoId, newDate) };
        this.#projectDisplayer.todoRemoveListener = (todoId) => { this.#onTodoRemove(todoId) };
        this.#projectDisplayer.todoDescriptionChangedListener = (todoId, newDesc) => { this.#onTodoDescriptionChanged(todoId, newDesc) };
    }

    #onUserNameChanged(newName)
    {
        this.#user.name = newName;
        SaveManager.save(this.#user);
    }

    #onAddProject()
    {
        this.#user.addProject(Project.makeDefault());
        SaveManager.save(this.#user);
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
        SaveManager.save(this.#user);
    }

    #onProjectDescriptionChanged(newDescription)
    {
        this.#user.updateProjectDescription(this.#selectedProject, newDescription);
        SaveManager.save(this.#user);
    }

    #onProjectRemoved()
    {
        this.#user.removeProject(this.#selectedProject);
        
        if (this.#user.projects.length === 0)
        {
            this.#user.addProject(Project.makeDefault());
        }

        this.#sidebarDisplayer.show(this.#user);
        SaveManager.save(this.#user);
    }

    #onAddTodo()
    {
        this.#user.getProject(this.#selectedProject).addTodoList(TodoItem.makeDefault());
        this.#projectDisplayer.show(this.#user.getProject(this.#selectedProject));
        SaveManager.save(this.#user);
    }

    #onTodoNameChanged(todoId, newName)
    {
        this.#user.getProject(this.#selectedProject).getTodoList(todoId).title = newName;
        SaveManager.save(this.#user);
    }

    #onTodoDescriptionChanged(todoId, newDesc)
    {
        this.#user.getProject(this.#selectedProject).getTodoList(todoId).description = newDesc;
        SaveManager.save(this.#user);
    }

    #onTodoValidateChanged(checked, todoId)
    {
        const project = this.#user.getProject(this.#selectedProject);
        project.validateTodoList(todoId, checked);
        this.#projectDisplayer.show(project);
        SaveManager.save(this.#user);
    }

    #onTodoPriorityChanged(todoId, priority)
    {
        const project = this.#user.getProject(this.#selectedProject);
        project.setTodoPriority(todoId, priority);
        this.#projectDisplayer.show(project);
        SaveManager.save(this.#user);
    }

    #onTodoDueDateChanged(todoId, newDate)
    {
        const project = this.#user.getProject(this.#selectedProject);
        const date = parse(newDate, "yyyy-MM-dd", new Date());
        project.setTodoDueDate(todoId, date);
        this.#projectDisplayer.show(project);
        SaveManager.save(this.#user);
    }

    #onTodoRemove(todoId)
    {
        const project = this.#user.getProject(this.#selectedProject);
        project.removeTodoList(todoId);
        this.#projectDisplayer.show(project);
        SaveManager.save(this.#user);
    }
}