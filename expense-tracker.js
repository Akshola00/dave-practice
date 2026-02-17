const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let expenses = [];

const mainMenu = () => {
    console.log('\n=== Expense Tracker ===');
    console.log('1. Add Expense');
    console.log('2. View All Expenses');
    console.log('3. Show Total Spent');
    console.log('4. Show Total by Category');
    console.log('5. Exit');

    rl.question('Select an option: ', handleMenuSelection);
};

const handleMenuSelection = (option) => {
    switch (option) {
        case '1':
            addExpense();
            break;
        case '2':
            viewExpenses();
            break;
        case '3':
            calculateTotal();
            break;
        case '4':
            calculateTotalByCategory();
            break;
        case '5':
            console.log('Exiting...');
            rl.close();
            break;
        default:
            console.log('Invalid option. Please try again.');
            mainMenu();
            break;
    }
};

const addExpense = () => {
    rl.question('Enter amount: ', (amountInput) => {
        const amount = parseFloat(amountInput);
        if (isNaN(amount) || amount <= 0) {
            console.log('Invalid amount. Please enter a positive number.');
            addExpense();
            return;
        }

        rl.question('Enter category: ', (category) => {
            rl.question('Enter date (YYYY-MM-DD): ', (date) => {
                expenses.push({ amount, category, date });
                console.log('Expense added successfully!');
                mainMenu();
            });
        });
    });
};

const viewExpenses = () => {
    console.log('\n--- Expenses ---');
    if (expenses.length === 0) {
        console.log('No expenses found.');
    } else {
        expenses.forEach((expense, index) => {
            console.log(`${index + 1}. Date: ${expense.date}, Category: ${expense.category}, Amount: $${expense.amount.toFixed(2)}`);
        });
    }
    mainMenu();
};

const calculateTotal = () => {
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    console.log(`\nTotal Spent: $${total.toFixed(2)}`);
    mainMenu();
};

const calculateTotalByCategory = () => {
    rl.question('Enter category to calculate total: ', (categoryInput) => {
        const categoryTotal = expenses
            .filter(expense => expense.category.toLowerCase() === categoryInput.toLowerCase())
            .reduce((sum, expense) => sum + expense.amount, 0);

        console.log(`\nTotal Spent on "${categoryInput}": $${categoryTotal.toFixed(2)}`);
        mainMenu();
    });
};

console.log('Welcome to the Expense Tracker!');
mainMenu();
