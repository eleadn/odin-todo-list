import TodoItem from "./todo-item";

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

    addTodoList(todoItem)
    {
        const id = crypto.randomUUID();
        this.#todoList.push({id, content: todoItem});
        this.#reorder();
    }

    addTodoLists(todoItems)
    {
        for (let i = 0; i < todoItems.length; ++i)
        {
            this.addTodoList(todoItems.at(i));
        }
    }

    getTodoList(id)
    {
        const todoList = this.#todoList.find((value, _, __) => value.id === id);
        return todoList !== undefined ? todoList.content: null;
    }

    validateTodoList(id, checked)
    {
        const todoList = this.getTodoList(id);
        todoList.checked = checked;
        this.#reorder();
    }

    #compareTodoList(a, b)
    {
        if (a.checked !== b.checked)
        {
            return a.checked ? 1: -1;
        }

        return 0;
    }

    #reorder()
    {
        this.#todoList = this.#todoList.sort((a, b) => this.#compareTodoList(a.content, b.content));
    }
}