require("./sidebarViewModel")

import TextBox from "../utility/textBox";
import ViewBase from "./viewBase"

export default class SidebarView extends ViewBase
{
    selectActiveProjectListener;

    #sidebarViewModel;
    
    #selectedProject;
    #selectedId;

    constructor(document, sidebar, sidebarViewModel)
    {
        super(document, sidebar);

        this.#sidebarViewModel = sidebarViewModel;

        this.#selectedProject = null;

        this.selectActiveProjectListener = null;
    }

    #addProjectClick()
    {
        this.#sidebarViewModel.onAddProject();
        this.show();
    }

    #setSelectedProject(project)
    {
        if (this.#selectedProject !== null)
        {
            this.#selectedProject.classList.remove("selected");
        }
        this.#selectedProject = project;
        this.#selectedProject.classList.add("selected");

        if (this.selectActiveProjectListener !== null)
        {
            this.selectActiveProjectListener(project.dataset.id);
        }

        this.#selectedId = this.#selectedProject.dataset.id;
    }

    #showUserName()
    {
        const userName = this._document.createElement("div");
        userName.classList.add("user-name");

        const userNameTextbox = new TextBox(
            this._document,
            this.#sidebarViewModel.userName,
            ["user-name-textbox"]
        );
        userNameTextbox.contentChangedListener = (name) => this.#sidebarViewModel.onUserNameChanged(name);

        const virgule = this._document.createElement("p");
        virgule.textContent = ",";

        const userNameEdit = this._document.createElement("button");
        userNameEdit.classList.add("user-name-edit");
        userNameEdit.addEventListener("click", _ => userNameTextbox.startEdit());

        const userNameEditImg = this._document.createElement("div");

        userNameEdit.appendChild(userNameEditImg);

        userNameTextbox.setParent(userName);
        userName.appendChild(virgule);
        userName.appendChild(userNameEdit);

        this._container.appendChild(userName);
    }

    #showProjectListHeader()
    {
        const header = this._document.createElement("div");
        header.classList.add("project-list-header");

        const title = this._document.createElement("h3");
        title.textContent = "Your projects";

        const addProjectButton = this._document.createElement("button");
        addProjectButton.classList.add("add-project");
        addProjectButton.addEventListener("click", _ => this.#addProjectClick());

        const addProjectButtonImg = this._document.createElement("div");

        addProjectButton.appendChild(addProjectButtonImg);

        header.appendChild(title);
        header.appendChild(addProjectButton);

        this._container.appendChild(header);
    }

    #showProjectList(reset)
    {
        const projectList = this._document.createElement("ul");
        projectList.classList.add("project-list");
        const projects = this.#sidebarViewModel.userProjects;

        for (let i = 0; i < projects.length; ++i)
        {
            const projectElement = this.#createProjectElement(projects[i], i == 0 && reset);
            projectList.appendChild(projectElement);
        }

        this._container.appendChild(projectList);
    }

    #createProjectElement(project, shouldSelect = false)
    {
        const listItem = this._document.createElement("li");

        const projectButton = this._document.createElement("button");
        projectButton.classList.add("project-button");
        projectButton.dataset.id = project.id;
        if (shouldSelect || !shouldSelect && project.id === this.#selectedId)
        {
            this.#setSelectedProject(projectButton);
        }

        projectButton.addEventListener("click", _ => this.#setSelectedProject(projectButton));

        const projectTitle = this._document.createElement("p");
        projectTitle.textContent = project.infos.title;

        projectButton.appendChild(projectTitle);

        listItem.appendChild(projectButton);

        return listItem;
    }

    show(reset = false)
    {
        super.show();

        this.#showUserName();
        this.#showProjectListHeader();
        this.#showProjectList(reset);
    }
}