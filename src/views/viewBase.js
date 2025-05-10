export default class ViewBase
{
    #document;

    constructor(document)
    {
        this.#document = document;
    }

    get document()
    {
        return this.#document;
    }

    show()
    {}
}