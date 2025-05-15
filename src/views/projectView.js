require("./projectViewModel")

import TextBox from "../utility/textbox";
import ViewBase from "./viewBase";

export default class ProjectView extends ViewBase
{
    #projectViewModel;

    constructor(document, projectContainer, projectViewModel)
    {
        super(document, projectContainer);

        this.#projectViewModel = projectViewModel;
    }

    #showProjectHeader()
    {
        const projectHeader = this._document.createElement("div");
        projectHeader.classList.add("project-header");

        const projectNameHeader = this._document.createElement("div");
        projectNameHeader.classList.add("project-name-header");

        const projectNameTextBox = new TextBox(
            this._document,
            this.#projectViewModel.projectName,
            ["project-name"]
        );
        projectNameTextBox.onContentChanged = (name) => this.#projectViewModel.onProjectNameChanged(name);

        const editProjectName = this._document.createElement("button");
        editProjectName.classList.add("edit-project-name");
        editProjectName.addEventListener("click", _ => projectNameTextBox.startEdit());

        const editProjectNamePicture = this._document.createElement("div");

        const projectDescTextBox = new TextBox(
            this._document,
            this.#projectViewModel.projectDescription,
            ["project-desc"],
            true
        );
        projectDescTextBox.onContentChanged = (name) => this.#projectViewModel.onProjectDescriptionChanged(name);

        editProjectName.appendChild(editProjectNamePicture);

        projectNameTextBox.setParent(projectNameHeader);
        projectNameHeader.appendChild(editProjectName);

        projectHeader.appendChild(projectNameHeader);
        projectDescTextBox.setParent(projectHeader);

        this._container.appendChild(projectHeader);
    }

    show()
    {
        super.show();

        this.#showProjectHeader();
    }
}