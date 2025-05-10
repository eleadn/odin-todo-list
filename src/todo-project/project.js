import TodoItem from "./todo-item";

export default class Project
{
    #title;
    #description;

    #todoList;

    constructor(title, description = "")
    {
        this.#title = title;
        this.#description = description;

        this.#todoList = [];
    }
}