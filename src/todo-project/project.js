import TodoItem from "./todo-item";

export default class Project
{
    constructor(title, description = "", todoItems = [])
    {
        this.title = title;
        this.description = description;

        this.todoList = [];
        if (todoItems.length > 0)
        {
            this.addTodoLists(todoItems);
        }
    }

    static makeDefault()
    {
        const defaultTodo = TodoItem.makeDefault();
        return new Project("New Project", "Project Description", [defaultTodo]);
    }

    addTodoList(todoItem)
    {
        const id = crypto.randomUUID();
        this.todoList.push({id, todo: todoItem});
    }

    addTodoLists(todoItems)
    {
        for (let i = 0; i < todoItems.length; ++i)
        {
            this.addTodoList(todoItems.at(i));
        }
    }

    getTodoList(id)
    {
        const todoList = this.todoList.find((value, _, __) => value.id === id);
        return todoList !== undefined ? todoList: null;
    }
}