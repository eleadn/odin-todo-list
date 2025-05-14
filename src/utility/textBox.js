export default class TextBox
{
    onContentChanged;

    #textbox;

    constructor(document, content, ...classes)
    {
        this.#textbox = document.createElement("span");
        this.#textbox.textContent = content;
        if (classes.length > 0)
        {
            this.#textbox.classList.add(classes);
        }

        this.#textbox.addEventListener("focusout", _ => this.#onFocusOut());
        this.#textbox.addEventListener("keypress", event => this.#handleEnter(event.key));

        this.onContentChanged = null;
    }

    setParent(parent)
    {
        parent.appendChild(this.#textbox);
    }

    startEdit()
    {
        this.#textbox.setAttribute("contenteditable", "true");
        this.#textbox.focus();
    }

    #onFocusOut()
    {
        this.#textbox.setAttribute("contenteditable", "false");
        if (this.onContentChanged !== null)
        {
            this.onContentChanged(this.#textbox.textContent);
        }
    }

    #handleEnter(key)
    {
        if (key === "Enter")
        {
            this.#textbox.blur();
        }
    }
}