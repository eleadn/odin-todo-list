import CheckListItem from "./checklist-item";

export default class TodoItem
{
    #title;
    #description;
    #dueDate;
    #priority;

    #checked;
    #progress;
    #checklist;

    constructor(title, description = "", dueDate = Date.now, priority = 0)
    {
        this.#title = title;
        this.#description = description;
        this.#dueDate = dueDate;
        this.#priority = priority;

        this.#checked = false;
        this.#progress = 1;
        this.#checklist = [];
    }
}