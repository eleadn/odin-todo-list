export default class CheckListItem
{
    constructor(description)
    {
        this.description = description;
        this.checked = false;
    }

    static makeDefault()
    {
        return new CheckListItem("Task");
    }
}