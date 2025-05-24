import "./style.css"
import User from "./user/user"
import DisplayHandler from "./displayHandler";
import SaveManager from "./saveManager/saveManager";

const user = SaveManager.load();

const displayHandler = new DisplayHandler(document, user);
displayHandler.display();