export default class TodoItem
{
    constructor(title, description = "", dueDate = null, priority = 2)
    {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;

        this.checked = false;
    }

    static makeDefault()
    {
        return new TodoItem("Todo", "To be done");
    }
}