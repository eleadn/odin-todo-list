import "./style.css"
import Project from "./todo-project/project"
import User from "./user/user"
import ProjectView from "./views/projectView"
import ProjectViewModel from "./views/projectViewModel"
import SidebarView from "./views/sidebarView"
import SidebarViewModel from "./views/sidebarViewModel"

const defaultProject = new Project("New Project", "Project Desc");
const user = new User("User");

const sidebar = document.querySelector("#sidebar");
const projectDisplay = document.querySelector("#project-display");

const sidebarViewModel = new SidebarViewModel(user, defaultProject);
const sidebarView = new SidebarView(document, sidebar, sidebarViewModel);

const projectViewModel = new ProjectViewModel(user, user.projects[0].id);
const projectView = new ProjectView(document, projectDisplay, projectViewModel);

sidebarView.selectActiveProjectListener = (projectId) => 
{
    projectViewModel.selectProject(projectId);
    projectView.show();
}

projectViewModel.projectNameListener = () => sidebarView.show();

sidebarView.show(true);
projectView.show();