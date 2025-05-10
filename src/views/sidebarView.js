require("./sidebarViewModel")

import ViewBase from "./viewBase"

export default class SidebarView extends ViewBase
{
    #sidebar;
    #sidebarViewModel;

    constructor(document, sidebar, sidebarViewModel)
    {
        super(document);

        this.#sidebar = sidebar;
        this.#sidebarViewModel = sidebarViewModel;
    }

    #userNameEditClick(userNameTextBox)
    {
        userNameTextBox.setAttribute("contentEditable", true);
        userNameTextBox.focus();
    }

    #userNameKeyPress(key, userNameTextBox)
    {
        if (key === "Enter")
        {
            this.#userNameFocusOut(userNameTextBox);
        }
    }

    #userNameFocusOut(userNameTextBox)
    {
        userNameTextBox.setAttribute("contentEditable", false);
        this.#sidebarViewModel.onUserNameChanged(userNameTextBox.textContent);
    }

    #resetSidebar()
    {
        while (this.#sidebar.firstChild)
        {
            this.#sidebar.removeChild(this.#sidebar.lastChild);
        }
    }

    #showUserName()
    {
        const userName = this.document.createElement("div");
        userName.classList.add("user-name");

        const userNameTextBox = this.document.createElement("span");
        userNameTextBox.classList.add("input");
        userNameTextBox.classList.add("user-name-textbox");
        userNameTextBox.textContent = this.#sidebarViewModel.userName;
        userNameTextBox.addEventListener("focusout", _ => this.#userNameFocusOut(userNameTextBox));
        userNameTextBox.addEventListener("keypress", event => this.#userNameKeyPress(event.key, userNameTextBox))

        const virgule = this.document.createElement("p");
        virgule.textContent = ",";

        const userNameEdit = this.document.createElement("button");
        userNameEdit.classList.add("user-name-edit");
        userNameEdit.addEventListener("click", _ => this.#userNameEditClick(userNameTextBox));

        const userNameEditImg = this.document.createElement("div");

        userNameEdit.appendChild(userNameEditImg);

        userName.appendChild(userNameTextBox);
        userName.appendChild(virgule);
        userName.appendChild(userNameEdit);

        this.#sidebar.appendChild(userName);
    }

    #showProjectListHeader()
    {
        const header = this.document.createElement("div");
        header.classList.add("project-list-header");

        const title = this.document.createElement("h3");
        title.textContent = "Your projects";

        const addProjectButton = this.document.createElement("button");
        addProjectButton.classList.add("add-project");

        const addProjectButtonImg = this.document.createElement("div");

        addProjectButton.appendChild(addProjectButtonImg);

        header.appendChild(title);
        header.appendChild(addProjectButton);

        this.#sidebar.appendChild(header);
    }

    #showProjectList()
    {
        const projectList = this.document.createElement("ul");
        projectList.classList.add("project-list");
        const projects = this.#sidebarViewModel.userProjects;

        for (let i = 0; i < projects.length; ++i)
        {
            const projectElement = this.#createProjectElement(projects[i].infos);
            projectList.appendChild(projectElement);
        }

        this.#sidebar.appendChild(projectList);
    }

    #createProjectElement(project)
    {
        const listItem = this.document.createElement("li");

        const projectButton = this.document.createElement("button");
        projectButton.classList.add("project-button");

        const projectTitle = this.document.createElement("p");
        projectTitle.textContent = project.title;

        projectButton.appendChild(projectTitle);

        listItem.appendChild(projectButton);

        return listItem;
    }

    show()
    {
        this.#resetSidebar();

        this.#showUserName();
        this.#showProjectListHeader();
        this.#showProjectList();
    }
}