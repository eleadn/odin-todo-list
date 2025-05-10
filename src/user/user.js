export default class User
{
    #userName;

    #projects;

    constructor(userName)
    {
        this.#userName = userName;

        this.#projects = [];
    }
}