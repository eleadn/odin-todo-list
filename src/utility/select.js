export default class Select
{
    changeSelectionListener;

    #select;

    constructor(document, options, classes = [], defaultValue = -1)
    {
        this.#select = document.createElement("select");
        if (classes.length > 0)
        {
            this.#select.classList.add(classes);
        }

        this.#setOptions(document, options);
        this.#select.selectedIndex = defaultValue;

        this.#select.addEventListener("change", e => this.#onSelectionChanged(e.target.selectedIndex));
        this.changeSelectionListener = null;
    }

    static createOption(value, content)
    {
        return { value, content };
    }

    setParent(parent)
    {
        parent.appendChild(this.#select);
    }

    #createOption(document, option)
    {
        const optionElement = document.createElement("option");
        optionElement.value = option.value;
        optionElement.textContent = option.content;
        this.#select.appendChild(optionElement);
    }

    #setOptions(document, options)
    {
        for (let i = 0; i < options.length; ++i)
        {
            this.#createOption(document, options[i]);
        }
    }

    #onSelectionChanged(newSelection)
    {
        if (this.changeSelectionListener !== null)
        {
            this.changeSelectionListener(newSelection);
        }
    }
}