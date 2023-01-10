document.getElementById('expForm').addEventListener('submit', addExpense);

// initial array of expenses, reading from localStorage
const expenses = JSON.parse(localStorage.getItem('expenses')) || [];

function addExpense(e){
    e.preventDefault();

    // get category, expense, description
    let amount = document.getElementById('amount').value;
    let description = document.getElementById('description').value;
    let category = document.getElementById('category').value;

    if(amount > 0 
        && description.length > 0 && (category != 'chooseOne') ){
        const expense = {
            amount, 
            description,
            category, 
            id: expenses.length > 0 ? expenses[expenses.length - 1].id + 1 : 1,
        }

        expenses.push(expense);
        // localStorage 
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }

    document.getElementById('expForm').reset();
    showExpenses();
}

const showExpenses = () => {

    const expenseTable = document.getElementById('expenseTable');

    expenseTable.innerHTML = '';

    for(let i = 0; i < expenses.length; i++){
        expenseTable.innerHTML += `
            <tr>
                <td>${expenses[i].amount}</td>
                <td>${expenses[i].description}</td>
                <td>${expenses[i].category}</td>
                <td><a class="btn btn-danger" onclick="deleteExpense(${expenses[i].id})">Delete</td>
                <td><a class="btn btn-info" onclick="onclick=editUserDetails('${expenses[i].amount}','${expenses[i].description}','${expenses[i].category}', '${expenses[i].id}')">Edit</td>
            </tr>
        `;
    }
}

const deleteExpense = (id) => {
    for(let i = 0; i < expenses.length; i++){
        if(expenses[i].id == id){
            expenses.splice(i, 1);
        }
    }

    // localStorage
    localStorage.setItem('expenses', JSON.stringify(expenses));
    showExpenses();
}

function editUserDetails(amount, description, category, id) {
    document.getElementById("amount").value = amount;
    document.getElementById("description").value = description;
    document.getElementById("category").value = category;
    deleteExpense(id)
}

showExpenses();