const fs = require('fs');
const path = require('path');

const TASKS_FILE = path.join(__dirname, 'tasks.json');

function loadTasks() {
    if (!fs.existsSync(TASKS_FILE)) {
        return [];
    }
    try {
        const data = fs.readFileSync(TASKS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading tasks file:', error.message);
        return [];
    }
}

function saveTasks(tasks) {
    try {
        fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));
    } catch (error) {
        console.error('Error saving tasks:', error.message);
    }
}

function add(title) {
    const tasks = loadTasks();
    const id = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
    tasks.push({ id, title, completed: false });
    saveTasks(tasks);
    console.log(`Task added: "${title}" (ID: ${id})`);
}

function list() {
    const tasks = loadTasks();
    if (tasks.length === 0) {
        console.log('No tasks found.');
        return;
    }
    console.log('Your tasks:');
    tasks.forEach(task => {
        const status = task.completed ? '[x]' : '[ ]';
        console.log(`${status} ${task.id}: ${task.title}`);
    });
}

function deleteTask(id) {
    const tasks = loadTasks();
    const initialLength = tasks.length;
    const newTasks = tasks.filter(t => t.id !== parseInt(id));
    
    if (newTasks.length === initialLength) {
        console.log(`Task with ID ${id} not found.`);
        return;
    }
    
    saveTasks(newTasks);
    console.log(`Task ${id} deleted.`);
}

function complete(id) {
    const tasks = loadTasks();
    const task = tasks.find(t => t.id === parseInt(id));
    
    if (!task) {
        console.log(`Task with ID ${id} not found.`);
        return;
    }
    
    task.completed = true;
    saveTasks(tasks);
    console.log(`Task ${id} marked as completed.`);
}

function main() {
    const command = process.argv[2];
    const args = process.argv.slice(3);

    switch (command) {
        case 'add':
            if (args.length === 0) {
                console.log('Usage: node todo.js add <task title>');
            } else {
                add(args.join(' ')); // Join remaining args to allow spaces without quotes (mostly)
            }
            break;
        case 'list':
            list();
            break;
        case 'delete':
            if (args.length === 0) {
                console.log('Usage: node todo.js delete <id>');
            } else {
                deleteTask(args[0]);
            }
            break;
        case 'complete':
            if (args.length === 0) {
                console.log('Usage: node todo.js complete <id>');
            } else {
                complete(args[0]);
            }
            break;
        default:
            console.log('Usage: node todo.js <command> [args]');
            console.log('Commands: add, list, delete, complete');
            break;
    }
}

main();
