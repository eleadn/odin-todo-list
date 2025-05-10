import "./style.css"
import Project from "./todo-project/project"
import User from "./user/user"
import SidebarView from "./views/sidebarView"
import SidebarViewModel from "./views/sidebarViewModel"

const project1 = new Project("This is a project");
const project2 = new Project("Project 2");

const user = new User("Eleanore", project1, project2);
const sidebarViewModel = new SidebarViewModel(user);
const sidebar = document.querySelector("#user-infos");

const sidebarView = new SidebarView(document, sidebar, sidebarViewModel);

sidebarView.show();