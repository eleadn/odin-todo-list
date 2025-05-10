import Project from "../todo-project/project";

export default class User
{
    #userName;

    #projects;

    constructor(userName, ...projects)
    {
        this.#userName = userName;

        if (projects.length > 0)
        {
            this.addProjects(projects);
        }
        else
        {
            this.#projects = [];
        }
    }

    get userName()
    {
        return this.#userName;
    }

    get projects()
    {
        return this.#projects;
    }

    addProject(project)
    {
        const id = crypto.randomUUID();
        this.#projects.push({id, project});
    }

    addProjects(...projects)
    {
        for (project in projects)
        {
            this.addProject(project);
        }
    }

    getProject(id)
    {
        const project = this.#projects.find((value, _, __) => value.id == id);
        return project !== undefined ? project: null;
    }
}