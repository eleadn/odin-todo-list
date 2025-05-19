require("../todo-project/project")

export default class User
{
    constructor(name, projects = [])
    {
        this.name = name;

        this.projects = [];
        if (projects.length > 0)
        {
            this.addProjects(projects);
        }
    }

    addProject(project)
    {
        const id = crypto.randomUUID();
        this.projects.push({id, infos: project});
    }

    addProjects(projects)
    {
        for (let i = 0; i < projects.length; ++i)
        {
            this.addProject(projects[i]);
        }
    }

    getProject(id)
    {
        const project = this.projects.find((value, _, __) => value.id == id);
        return project !== undefined ? project.infos: null;
    }

    updateProjectName(id, newName)
    {
        this.getProject(id).title = newName;
    }

    updateProjectDescription(id, newDesc)
    {
        this.getProject(id).description = newDesc;
    }

    removeProject(projectId)
    {
        this.projects = this.projects.filter((value, _, __) => value.id !== projectId);
    }
}