export default class TextBox
{
    contentChangedListener;

    #textbox;

    constructor(document, content, classes = [], alwaysActive = false)
    {
        this.#textbox = document.createElement("span");
        this.#textbox.textContent = content;
        if (classes.length > 0)
        {
            this.#textbox.classList.add(classes);
        }

        if (alwaysActive)
        {
            this.#textbox.addEventListener("click", _ => this.startEdit());
        }
        this.#textbox.addEventListener("focusout", _ => this.#onFocusOut());
        this.#textbox.addEventListener("keypress", event => this.#handleEnter(event.key));

        this.contentChangedListener = null;
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

        if (this.contentChangedListener !== null)
        {
            this.contentChangedListener(this.#textbox.textContent);
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