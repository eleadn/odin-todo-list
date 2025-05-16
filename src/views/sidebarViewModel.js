export default class SidebarViewModel
{
    onUserNameChanged;
    onAddProject;

    #user;
    #defaultProject;

    constructor(user, defaultProject)
    {
        this.#user = user;
        this.#defaultProject = defaultProject.getCopy();

        if (this.#user.projects.length === 0)
        {
            this.#user.addProject(defaultProject);
        }

        this.onUserNameChanged = this.#userNameChanged;
        this.onAddProject = this.#addProject;
    }

    get userName()
    {
        return this.#user.name;
    }

    get userProjects()
    {
        if (this.#user.projects.length === 0)
        {
            this.#addProject();
        }
        return this.#user.projects;
    }

    #addProject()
    {
        this.#user.addProject(this.#defaultProject.getCopy());
    }

    #userNameChanged(newName)
    {
        this.#user.name = newName;
    }
}