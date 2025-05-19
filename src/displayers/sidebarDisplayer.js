import TextBox from "../utility/textBox";
import DisplayerBase from "./displayerBase";

export default class SidebarDisplayer extends DisplayerBase
{
    selectActiveProjectListener;
    addProjectListener;
    userNameChangeListener;

    #selectedProject;

    constructor(document, sidebarContainer)
    {
        super(document, sidebarContainer);

        this.#selectedProject = null;

        this.selectActiveProjectListener = null;
        this.addProjectListener = null;
        this.userNameChangeListener = null;
    }

    #addProjectClick(user)
    {
        this._invokeListener(this.addProjectListener);
        this.show(user);
    }

    #setSelectedProject(project)
    {
        if (this.#selectedProject !== null)
        {
            this.#selectedProject.classList.remove("selected");
        }
        this.#selectedProject = project;
        this.#selectedProject.classList.add("selected");
        
        this._invokeListener(this.selectActiveProjectListener, project.dataset.id);
    }

    #showUserName(user)
    {
        const userName = this._document.createElement("div");
        userName.classList.add("user-name");

        const userNameTextbox = new TextBox(
            this._document,
            user.name,
            ["user-name-textbox"]
        );
        userNameTextbox.contentChangedListener = (newName) => { this._invokeListener(this.userNameChangeListener, newName); };

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

    #showProjectListHeader(user)
    {
        const header = this._document.createElement("div");
        header.classList.add("project-list-header");

        const title = this._document.createElement("h3");
        title.textContent = "Your projects";

        const addProjectButton = this._document.createElement("button");
        addProjectButton.classList.add("add-project");
        addProjectButton.addEventListener("click", _ => this.#addProjectClick(user));

        const addProjectButtonImg = this._document.createElement("div");

        addProjectButton.appendChild(addProjectButtonImg);

        header.appendChild(title);
        header.appendChild(addProjectButton);

        this._container.appendChild(header);
    }

    #showProjectList(user)
    {
        const projectList = this._document.createElement("ul");
        projectList.classList.add("project-list");

        var shouldReset = user.projects.every((project, _, __) => project.id !== this.#selectedProject);
        for (let i = 0; i < user.projects.length; ++i)
        {
            const projectElement = this.#createProjectElement(user.projects[i], i === 0 && shouldReset);
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
        if (shouldSelect || !shouldSelect && project.id === this.#selectedProject.dataset.id)
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

    show(user)
    {
        super.show();

        this.#showUserName(user);
        this.#showProjectListHeader(user);
        this.#showProjectList(user);
    }
}