export default class ViewBase
{
    _document;
    _container;

    constructor(document, container)
    {
        this._document = document;
        this._container = container;
    }

    show()
    {}
}