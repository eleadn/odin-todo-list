export default class CheckListItem
{
    constructor(description)
    {
        this.description = description;
        this.checked = false;
    }

    getCopy()
    {
        const copy = new CheckListItem(this.description);
        copy.checked = this.checked;
        return copy;
    }
}