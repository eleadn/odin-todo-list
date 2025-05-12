require("./projectViewModel")

import ViewBase from "./viewBase";

export default class ProjectView extends ViewBase
{
    #projectViewModel;

    constructor(document, projectContainer, projectViewModel)
    {
        super(document, projectContainer);

        this.#projectViewModel = projectViewModel;
    }
}