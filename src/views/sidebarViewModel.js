export default class SidebarViewModel
{
    #user;

    constructor(user)
    {
        this.#user = user;
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