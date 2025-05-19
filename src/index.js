import "./style.css"
import Project from "./todo-project/project"
import User from "./user/user"
import DisplayHandler from "./displayHandler";

const user = new User("User", [Project.makeDefault()]);

const displayHandler = new DisplayHandler(document, user);
displayHandler.display();