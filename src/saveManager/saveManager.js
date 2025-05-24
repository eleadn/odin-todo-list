import Project from "../todo-project/project";
import TodoItem from "../todo-project/todo-item";
import User from "../user/user";
import { format, parse } from "date-fns";

export default class SaveManager
{
    static #saveTodoItem(prefix, todoItem)
    {
        localStorage.setItem(`${prefix}-todo-title`, todoItem.title);
        localStorage.setItem(`${prefix}-todo-desc`, todoItem.description);
        localStorage.setItem(`${prefix}-dueDate`, todoItem.dueDate === null ? null: format(todoItem.dueDate, "yyyy-MM-dd"));
        localStorage.setItem(`${prefix}-priority`, todoItem.priority);
        localStorage.setItem(`${prefix}-checked`, todoItem.checked);
    }

    static #saveProject(prefix, project)
    {
        localStorage.setItem(`${prefix}-project-title`, project.title)
        localStorage.setItem(`${prefix}-project-desc`, project.description)

        const todoList = project.todoList;
        localStorage.setItem(`${prefix}-todos`, todoList.length);

        for (let i = 0; i < todoList.length; ++i)
        {
            this.#saveTodoItem(`${prefix}-${i}`, todoList[i].content);
        }
    }

    static #saveUser(user)
    {
        localStorage.setItem("user-name", user.name);

        const projects = user.projects;
        localStorage.setItem("user-projects", projects.length);

        for (let i = 0; i < projects.length; ++i)
        {
            this.#saveProject(i, projects[i].infos);
        }
    }

    static save(user)
    {
        localStorage.clear();

        this.#saveUser(user);
    }

    static #loadTodoItem(prefix)
    {
        const todoItem = TodoItem.makeEmpty();
        todoItem.title = localStorage.getItem(`${prefix}-todo-title`);
        todoItem.description = localStorage.getItem(`${prefix}-todo-desc`);
        const date = localStorage.getItem(`${prefix}-dueDate`);
        todoItem.dueDate = date === "null" ? null: parse(date, "yyyy-MM-dd", new Date());
        todoItem.priority = Number.parseInt(localStorage.getItem(`${prefix}-priority`));
        todoItem.checked = localStorage.getItem(`${prefix}-checked`) === "true";

        return todoItem;
    }

    static #loadProject(prefix)
    {
        const project = Project.makeEmpty();
        project.title = localStorage.getItem(`${prefix}-project-title`);
        project.description = localStorage.getItem(`${prefix}-project-desc`);

        const countTodoItem = Number.parseInt(localStorage.getItem(`${prefix}-todos`));
        const todos = [];

        for (let i = 0; i < countTodoItem; ++i)
        {
            todos.push(this.#loadTodoItem(`${prefix}-${i}`));
        }

        project.addTodoLists(todos);

        return project;
    }

    static #loadUser()
    {
        const user = new User("");
        user.name = localStorage.getItem("user-name");

        const countProjects = localStorage.getItem("user-projects");
        const projects = [];

        for (let i = 0; i < countProjects; ++i)
        {
            projects.push(this.#loadProject(i));
        }

        user.addProjects(projects);

        return user;
    }

    static load()
    {
        if (localStorage.length > 0)
        {
            return this.#loadUser();
        }

        return new User("User");
    }
}