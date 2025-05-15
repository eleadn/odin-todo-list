export default class SidebarViewModel
{
    #user;
    #defaultProject;

    onUserNameChanged;
    onAddProject;

    constructor(user, defaultProject)
    {
        this.#user = user;
        this.#defaultProject = defaultProject;

        if (this.#user.projects.length === 0)
        {
            this.#user.addProject(defaultProject);
        }

        this.onUserNameChanged = this.#userNameChanged;
        this.onAddProject = this.#addProject;
    }

    #addProject()
    {
        this.#user.addProject(this.#defaultProject.getCopy());
    }

    #userNameChanged(newName)
    {
        this.#user.name = newName;
    }

    get userName()
    {
        return this.#user.name;
    }

    get userProjects()
    {
        return this.#user.projects;
    }
}