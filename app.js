let expenseAmount = document.querySelector('#expense-amount');
let expenseInfo = document.querySelector('#expense-info');
let expenseCategory = document.querySelector('#expense-category');
let btn = document.querySelector('.btn');
let expenseList = document.querySelector('.expense-list');

document.addEventListener('DOMContentLoaded', getExpenses);
btn.addEventListener('click', addExpense);
expenseList.addEventListener('click', editExpense);
expenseList.addEventListener('click', deleteExpense);

function getExpenses() {
    let expenses;
    if (localStorage.getItem('expenses') == null) {
        expenses = [];
    } else {
        expenses = JSON.parse(localStorage.getItem('expenses'));   
    }

    expenses.forEach(expense => {
        const li = document.createElement('li');
        li.className = ('list-group-item d-flex justify-content-between align-items-center');
        const span = document.createElement('span');
        span.appendChild(document.createTextNode(`${expense.amount} ${expense.info} ${expense.category}`));
        li.appendChild(span);
        const div = document.createElement('div');
        const edit = document.createElement('a');
        edit.appendChild(document.createTextNode('Edit'));
        edit.className = ('edit btn btn-primary');
        div.appendChild(edit);
        const deleteIcon = document.createElement('a');
        deleteIcon.appendChild(document.createTextNode('Delete'));
        deleteIcon.className = ('delete btn btn-danger');
        div.appendChild(deleteIcon);
        li.appendChild(div);
        expenseList.appendChild(li);
    });
}

function addExpense(e) {
    e.preventDefault();
    if (expenseAmount.value == '' && expenseInfo.value == '' && expenseCategory.value == '') {
        alert('Enter all values');
    } else {
        addExpenseInLocalStorage(expenseAmount.value, expenseInfo.value, expenseCategory.value);
        expenseAmount.value = '';
        expenseInfo.value = '';
        expenseCategory.value = '';
    }
}

function addExpenseInLocalStorage(amount, info, category) {
    let expenses;
    if (localStorage.getItem('expenses') == null) {
        expenses = [];
    } else {
        expenses = JSON.parse(localStorage.getItem('expenses'));   
    }

    let isUpdationNotHappening = true;
    expenses.forEach(expense => {
        if (expense.amount == amount || expense.info == info || expense.category == category) {
            expense.amount = amount;
            expense.info = info;
            expense.category = category;
            isUpdationNotHappening = false;
        }
    });

    if (isUpdationNotHappening) {
        const li = document.createElement('li');
        li.className = ('list-group-item d-flex justify-content-between align-items-center');
        const span = document.createElement('span');
        span.appendChild(document.createTextNode(`${expenseAmount.value} ${expenseInfo.value} ${expenseCategory.value}`));
        li.appendChild(span);
        const div = document.createElement('div');
        const edit = document.createElement('a');
        edit.appendChild(document.createTextNode('Edit'));
        edit.className = ('edit btn btn-primary');
        div.appendChild(edit);
        const deleteIcon = document.createElement('a');
        deleteIcon.appendChild(document.createTextNode('Delete'));
        deleteIcon.className = ('delete btn btn-danger');
        div.appendChild(deleteIcon);
        li.appendChild(div);
        expenseList.appendChild(li);
        let expense = {'amount': amount, 'info': info, 'category': category};
        expenses.push(expense);
    }
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

function deleteExpense(e) {
    if (e.target.classList.contains('delete')) {
        e.target.parentElement.parentElement.remove();
        deleteExpenseFromLocalStorage(e.target.parentElement.parentElement);
    }
}

function deleteExpenseFromLocalStorage(expenseItem) {
    let expenses;
    if (localStorage.getItem('expenses') == null) {
        expenses = [];
    } else {
        expenses = JSON.parse(localStorage.getItem('expenses'));   
    }
    expenses = expenses.filter(expense => {
        return (expenseItem.textContent.split(' ')[0] != expense.amount);
    });
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

function editExpense(e) {
    if (e.target.classList.contains('edit')) {
        editExpenseFromLocalStorage(e.target.parentElement.parentElement);
    }
}

function editExpenseFromLocalStorage(expenseItem) {
    let expenses;
    if (localStorage.getItem('expenses') == null) {
        expenses = [];
    } else {
        expenses = JSON.parse(localStorage.getItem('expenses'));   
    }
    expenses.forEach(expense => {
        if (expenseItem.textContent.split(' ')[0] == expense.amount) {
            expenseAmount.value = expense.amount;
            expenseInfo.value = expense.info;
            expenseCategory.value = expense.category;
        }
    });
}