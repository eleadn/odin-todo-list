import CheckListItem from "./checklist-item";

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

    static makeDefault()
    {
        const defaultItem = CheckListItem.makeDefault();
        return new TodoItem("Todo", "To be done", Date.now(), 2, [defaultItem]);
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
        if (this.checklist.length > 0)
        {
            const totalChecked = this.checklist.reduce((total, item, _, __) => item.checked ? total + 1: total, 0);
            this.progress = totalChecked / this.checklist.length;
        }
        else
        {
            this.progress = 1;
        }
    }
}