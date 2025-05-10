export default class CheckListItem
{
    #checked;
    #description;

    constructor(description)
    {
        this.#description = description;
        this.#checked = false;
    }

    get checked()
    {
        return this.#checked;
    }
}