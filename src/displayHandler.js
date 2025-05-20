import ProjectDisplayer from "./displayers/projectDisplayer";
import SidebarDisplayer from "./displayers/sidebarDisplayer";
import Project from "./todo-project/project";

export default class DisplayHandler
{
    #user;
    #selectedProject;

    #sidebarDisplayer;
    #projectDisplayer;

    constructor(document, user)
    {
        this.#user = user;

        if (this.#user.projects.length == 0)
        {
            this.#user.addProject(Project.makeDefault());
        }

        this.#selectedProject = this.#user.projects[0].id;

        const sidebarContainer = document.querySelector("#sidebar");
        this.#sidebarDisplayer = new SidebarDisplayer(document, sidebarContainer);

        const projectContainer = document.querySelector("#project-display");
        this.#projectDisplayer = new ProjectDisplayer(document, projectContainer);

        this.#setSidebarListeners();
        this.#setProjectListeners();
    }

    display()
    {
        this.#sidebarDisplayer.show(this.#user);
    }

    #setSidebarListeners()
    {
        this.#sidebarDisplayer.userNameChangeListener = (newName) => { this.#user.name = newName };
        this.#sidebarDisplayer.addProjectListener = () => { this.#user.addProject(Project.makeDefault()) };
        this.#sidebarDisplayer.selectActiveProjectListener = (projectId) => { this.#onProjectSelected(projectId) };
    }

    #setProjectListeners()
    {
        this.#projectDisplayer.projectNameChangedListener = (newName) => { this.#onProjectNameChanged(newName) };
    }

    #onProjectSelected(projectId)
    {
        this.#selectedProject = projectId;
        this.#projectDisplayer.show(this.#user.getProject(projectId));
    }

    #onProjectNameChanged(newName)
    {
        this.#user.updateProjectName(this.#selectedProject, newName);
        this.#sidebarDisplayer.show(this.#user);
    }
}