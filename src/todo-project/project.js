import TodoItem from "./todo-item";
import { compareAsc } from "date-fns";

export default class Project
{
    #todoList;

    constructor(title, description = "", todoItems = [])
    {
        this.title = title;
        this.description = description;

        this.#todoList = [];
        if (todoItems.length > 0)
        {
            this.addTodoLists(todoItems);
        }
    }

    get todoList()
    {
        return this.#todoList;
    }

    set todoList(value)
    {
        this.#todoList = value;
        this.#reorder();
    }

    static makeDefault()
    {
        const defaultTodo = TodoItem.makeDefault();
        return new Project("New Project", "Project Description", [defaultTodo]);
    }

    static makeEmpty()
    {
        return new Project("");
    }

    addTodoList(todoItem)
    {
        this.#addTodoList(todoItem, true);
    }

    addTodoLists(todoItems)
    {
        for (let i = 0; i < todoItems.length; ++i)
        {
            this.#addTodoList(todoItems[i], false);
        }

        this.#reorder();
    }

    getTodoList(id)
    {
        const todoList = this.#todoList.find((value, _, __) => value.id === id);
        return todoList !== undefined ? todoList.content: null;
    }

    removeTodoList(id)
    {
        this.#todoList = this.#todoList.filter((value, _, __) => value.id !== id);
    }

    validateTodoList(id, checked)
    {
        const todoList = this.getTodoList(id);
        todoList.checked = checked;
        this.#reorder();
    }

    setTodoPriority(id, priority)
    {
        const todoList = this.getTodoList(id);
        todoList.priority = priority;
        this.#reorder();
    }

    setTodoDueDate(id, newDate)
    {
        const todoList = this.getTodoList(id);
        todoList.dueDate = newDate;
        this.#reorder();
    }

    #addTodoList(todoItem, shouldReorder)
    {
        const id = crypto.randomUUID();
        this.#todoList.push({id, content: todoItem});

        if (shouldReorder)
        {
            this.#reorder();
        }
    }

    #compareTodoList(a, b)
    {
        if (a.checked !== b.checked)
        {
            return a.checked ? 1: -1;
        }

        if (a.dueDate !== b.dueDate)
        {
            return a.dueDate === null ? 1 : b.dueDate === null ? -1 : compareAsc(a.dueDate, b.dueDate);
        }

        if (a.priority !== b.priority)
        {
            return b.priority - a.priority;
        }

        return 0;
    }

    #reorder()
    {
        this.#todoList = this.#todoList.sort((a, b) => this.#compareTodoList(a.content, b.content));
    }
}