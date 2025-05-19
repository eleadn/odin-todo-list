export default class DisplayerBase
{
    _document;
    _container;

    constructor(document, container)
    {
        this._document = document;
        this._container = container;
    }

    _invokeListener(listener, ...params)
    {
        if (listener !== null)
        {
            listener(...params);
        }
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