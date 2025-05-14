export default class ViewBase
{
    _document;
    _container;

    constructor(document, container)
    {
        this._document = document;
        this._container = container;
    }

    _resetContainer()
    {
        while (this._container.firstChild)
        {
            this._container.removeChild(this._container.lastChild);
        }
    }

    show()
    {
        this._resetContainer();
    }
}