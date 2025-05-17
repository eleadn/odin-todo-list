import TodoItem from "./todo-item";

export default class Project
{
    #title;
    #description;

    #todoList;

    constructor(title, description = "", todoItems = [])
    {
        this.#title = title;
        this.#description = description;

        this.#todoList = [];
        if (todoItems.length > 0)
        {
            this.addTodoLists(todoItems);
        }
    }

    get title()
    {
        return this.#title;
    }

    set title(newTitle)
    {
        this.#title = newTitle;
    }

    get description()
    {
        return this.#description;
    }

    set description(newDesc)
    {
        return this.#description = newDesc;
    }

    get todoList()
    {
        return this.#todoList;
    }

    getCopy()
    {
        const copy = new Project(this.#title, this.#description);
        copy.onProjectTitleUpdate = this.onProjectTitleUpdate;

        for (let i = 0; i < this.#todoList.length; ++i)
        {
            const todoList = this.#todoList.at(i);
            copy.#todoList.push({id: todoList.id, todo: todoList.todo.getCopy()});
        }

        return copy;
    }

    addTodoList(todoItem)
    {
        const id = crypto.randomUUID();
        this.#todoList.push({id, todo: todoItem});
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
        return todoList !== undefined ? todoList: null;
    }
}