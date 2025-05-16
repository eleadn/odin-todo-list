export default class ProjectViewModel
{
    onProjectNameChanged;
    projectNameListener;

    onProjectDescriptionChanged;

    onDeleteProject;
    deleteProjectListener;

    #user;
    #activeProject;

    constructor(user)
    {
        this.#user = user;
        this.#activeProject = null;

        this.onProjectNameChanged = this.#projectNameChanged;
        this.projectNameListener = null;

        this.onProjectDescriptionChanged = this.#projectDescriptionChanged;
        this.onDeleteProject = this.#deleteProject;
    }

    get projectName()
    {
        return this.#user.getProject(this.#activeProject).title;
    }

    get projectDescription()
    {
        return this.#user.getProject(this.#activeProject).description;
    }

    selectProject(projectId)
    {
        this.#activeProject = projectId;
    }

    #projectNameChanged(newName)
    {
        this.#user.updateProjectName(this.#activeProject, newName);

        if (this.projectNameListener !== null)
        {
            this.projectNameListener();
        }
    }

    #projectDescriptionChanged(newDesc)
    {
        this.#user.updateProjectDescription(this.#activeProject, newDesc);
    }

    #deleteProject()
    {
        this.#user.removeProject(this.#activeProject);

        if (this.deleteProjectListener !== null)
        {
            this.deleteProjectListener();
        }
    }
}