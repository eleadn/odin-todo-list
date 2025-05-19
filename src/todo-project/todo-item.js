require("./checklist-item")

export default class TodoItem
{
    constructor(title, description = "", dueDate = Date.now(), priority = 2, items = [])
    {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;

        this.checked = false;
        this.progress = 1;

        this.checklist = [];
        if (items.length > 0)
        {
            this.addChecklistItems(items);
        }
    }

    getCopy()
    {
        const copy = new TodoItem(this.title, this.description);
        copy.dueDate = this.dueDate;
        copy.priority = this.priority;
        copy.checked = this.checked;
        copy.progress = this.progress;
        copy.checklist = [];

        for (item in this.checklist)
        {
            copy.checklist.push(item.getCopy());
        }
    }

    addChecklistItem(item)
    {
        const id = crypto.randomUUID();
        this.checklist.push({id, item: item});
        this.#updateProgress();
    }

    addChecklistItems(items)
    {
        for (let i = 0; i < items.length; ++i)
        {
            this.addChecklistItem(items[i]);
        }
    }

    #updateProgress()
    {
        this.progress = this.checklist.reduce((total, item, _, __) => item.checked ? total + 1: total) / this.checklist.length;
    }
}