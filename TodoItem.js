class todoItem{
    constructor(title, description, dueDate, assignee,attachments){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.assignee = assignee;
        this.attachments = attachments;
        this.createdDate = new Date();
    }
}

export default todoItem;