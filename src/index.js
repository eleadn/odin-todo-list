import "./style.css"
import User from "./user/user"
import DisplayHandler from "./displayHandler";

const user = new User("User");

const displayHandler = new DisplayHandler(document, user);
displayHandler.display();