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

        for (item in this.#todoList)
        {
            copy.#todoList.push(item.getCopy());
        }

        return copy;
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