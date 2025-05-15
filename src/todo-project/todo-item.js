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

    constructor(title, description = "", dueDate = Date.now, priority = 0, ...items)
    {
        this.#title = title;
        this.#description = description;
        this.#dueDate = dueDate;
        this.#priority = priority;

        this.#checked = false;

        if (items.length > 0)
        {
            this.addChecklistItems(items);
        }
        else
        {
            this.#progress = 1;
            this.#checklist = [];
        }
    }

    getCopy()
    {
        const copy = new TodoItem(this.#title, this.#description);
        copy.#dueDate = this.#dueDate;
        copy.#priority = this.#priority;
        copy.#checked = this.#checked;
        copy.#progress = this.#progress;

        for (item in this.#checklist)
        {
            copy.#checklist.push(item.getCopy());
        }
    }

    addChecklistItem(item)
    {
        const id = crypto.randomUUID();
        this.#checklist.push({id, item: item});
        this.#updateProgress();
    }

    addChecklistItems(...items)
    {
        for (item in items)
        {
            this.addChecklistItem(item);
        }
    }

    #updateProgress()
    {
        this.#progress = this.#checklist.reduce((total, item, _, __) => item.checked ? total + 1: total) / this.#checklist.length;
    }
}