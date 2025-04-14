const { formatDistanceToNowStrict } = require("date-fns");

export default class Task {
    #subtasks;
    #isDone;
    #id;

    constructor( title, description, priority, dueDate=false, isDone=false, subtasks=[], id=crypto.randomUUID()) {
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.dueDate = dueDate;
        this.#isDone = isDone;
        this.#subtasks = subtasks;
        this.#id = id;
    }

    get id() {
        return this.#id;
    }

    get subtasks() {
        return this.#subtasks;
    }

    get isDone() {
        return this.#isDone;
    }

    switchStatus() {
        if (this.#isDone) this.#isDone = false;
        else this.#isDone = true;
    }

    addSubtask(subtask) {
        this.#subtasks.push(subtask);
    }

    removeSubtask(id) {
        this.#subtasks = this.#subtasks.filter(subtask => subtask.id !== id)
    }

    timeLeft() {
        if (!this.dueDate) return '-';
        return formatDistanceToNowStrict(this.dueDate, {addSuffix: true});
    }
}

