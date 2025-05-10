export default class SidebarViewModel
{
    #user;

    onUserNameChanged;

    constructor(user)
    {
        this.#user = user;

        this.onUserNameChanged = this.#userNameChanged;
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