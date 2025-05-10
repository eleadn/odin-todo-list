import TodoItem from "./todo-item";

export default class Project
{
    #title;
    #description;

    #todoList;

    constructor(title, description = "", ...todoItems)
    {
        this.#title = title;
        this.#description = description;

        if (todoItems.length > 0)
        {
            this.addTodoLists(todoItems);
        }
        else
        {
            this.#todoList = [];
        }
    }

    get title()
    {
        return this.#title;
    }

    get description()
    {
        return this.#description;
    }

    get todoList()
    {
        return this.#todoList;
    }

    addTodoList(todoItem)
    {
        const id = crypto.randomUUID();
        this.#todoList.push({id, todoItem});
    }

    addTodoLists(...todoItems)
    {
        for (todoItem in todoItems)
        {
            this.addTodoList(todoItem);
        }
    }

    getTodoList(id)
    {
        const todoList = this.#todoList.find((value, _, __) => value.id === id);
        return todoList !== undefined ? todoList: null;
    }
}