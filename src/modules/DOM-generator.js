//This might look insane and I'm sorry for that
const generateContainerHTML = (tasks) => {
    if (tasks.length === 0) return;
    let containerHTML = '';
    for (const task of tasks) {
         containerHTML += taskAssamble(
            task.title, task.description, task.priority, task.timeLeft(), task.isDone, task.subtasks, task.id
        );
    }

    document.querySelector('#container').innerHTML = containerHTML;
}

function taskAssamble (title, description, priority, timeLeft, isDone, subtasks, id) {
    let taskHTML = `<div class="task-card" id="${id}">`;
    taskHTML += appendHeader(title, isDone);
    taskHTML += appendDcription(description);
    taskHTML += appendPriority(priority);
    taskHTML += appendDueDate(timeLeft);
    taskHTML += appendSubtasks(subtasks);
    taskHTML += `</div>`

    return taskHTML;
}

function appendHeader(title, isDone) {
    let isDoneClass = '';
    let checkboxStatus = '';
    if (isDone) {
        isDoneClass = 'done';
        checkboxStatus = 'checked';
    }

    return `
        <header class="task-header">
            <input type="checkbox" name="task" ${checkboxStatus}>
            <h2 class="task-title ${isDoneClass}">${title}</h2>
            <button type="button">Modify</button>
            <button type="button">Delete</button>
        </header>
    `;
}

function appendDcription(description) {
    return `
        <section class="task-section">
            <textarea class="task-description">${description}</textarea>
        </section>
    `;
}

function appendPriority(priority) {
    const openingValues = [
        '<option value="0"',
        '<option value="1"',
        '<option value="2"',
        '<option value="3"',
        '<option value="4"',
    ];

    openingValues[priority] += ' default';

    const closingValues = [
        '>Highest</option>',
        '>High</option>',
        '>Medium</option>',
        '>Low</option>',
        '>Lowest</option>',
    ];
    
    let optionsHTML = '';

    for (let i=0; i < openingValues.length; i++) {
        optionsHTML += openingValues[i] + closingValues[i];
    }
    
    return `
        <section class="task-section--flex">
            <p>Priority: </p>
            <select name="priority">
                ${optionsHTML};
            </select>
        </section>
    `;
}

function appendDueDate(dueDate) {
    return `
        <section class="task-section--flex">
            <p class="task-due">Time to finish: ${dueDate}</p>
            <input type="date" name="date">
        </section>
    `;
}

function appendSubtasks(subtasks) {
    let subtasksHTML = `
        <section class="task-section">
            <h3>Subtasks</h3>
            <ul class="task-subtasks">
    `;
    const subtasksHTMLClosing = `
        </ul>
        <button type="button">Add subtask</button>
        </section>
    `;
    if (subtasks === 0) return subtasksHTML += subtasksHTMLClosing;
    for (const subtask of subtasks) {
        let isDoneClass = '';
        if (subtask.isDone) isDoneClass = "done";
        subtasksHTML += `
            <li class="task-subtask">
                <button type="button">${subtask.name}</button>
                <button type="button">Modify</button>
                <button type="button">Delete</button>
            </li>
        `;
    }
    return subtasksHTML += subtasksHTMLClosing;
}

export { generateContainerHTML };

/* 
        <div class="task-card">
            <header class="task-header">
                <input type="checkbox" name="task1" id="task1">
                <h2 class="task-title">Title</h2>
                <button type="button">Modify</button>
                <button type="button">Delete</button>
            </header>
            <section class="task-section">
                <textarea class="task-description">Lovely task description. Not to long, nor to short!</textarea>
            </section>
            <section class="task-section--flex">
                <p>Priority: </p>
                <select name="priority" id="priority">
                    <option value="1">Highest</option>
                    <option value="2">High</option>
                    <option value="3">Medium</option>
                    <option value="4">Low</option>
                    <option value="5">Lowest</option>
                </select>
            </section>
            <section class="task-section--flex">
                <p class="task-due">Due: -</p>
                <input type="date" name="date" id="date">
            </section>
            <section class="task-section">
                <h3>Subtasks</h3>
                <ul class="task-subtasks">
                    <li class="task-subtask">
                        <button type="button">Washing hands</button>
                        <button type="button">Modify</button>
                        <button type="button">Delete</button>
                    </li>
                    <li class="task-subtask">
                        <button type="button">Eating</button>
                        <button type="button">Modify</button>
                        <button type="button">Delete</button>
                    </li>
                    <li class="task-subtask">
                        <button type="button">Washing hands</button>
                        <button type="button">Modify</button>
                        <button type="button">Delete</button>
                    </li>
                </ul>
                <button type="button">Add subtask</button>
            </section>
        </div>
*/