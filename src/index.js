import "./style.css"
import Project from "./todo-project/project"
import User from "./user/user"
import SidebarView from "./views/sidebarView"
import SidebarViewModel from "./views/sidebarViewModel"

const defaultProject = new Project("New Project");
const user = new User("User");

const sidebar = document.querySelector("#sidebar");
const sidebarViewModel = new SidebarViewModel(user, defaultProject);

const sidebarView = new SidebarView(document, sidebar, sidebarViewModel);

sidebarView.show();