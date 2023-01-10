// function addExpense(event) {
//     event.preventDefault();
//     const expense = event.target.expense.value;
//     const description = event.target.description.value;
//     const category = event.target.category.value;

//     const obj = {
//         expense,
//         description,
//         category,
//     };

//     localStorage.setItem(obj.expense, JSON.stringify(obj));
//     showUser(obj);
// }
// window.addEventListener("DOMContentLoaded", () => {
//     const localStorageobj = localStorage;
//     const localStoragekeys = Object.keys(localStorageobj);
//     for (var i = 0; i < localStoragekeys.length; i++) {
//         const key = localStoragekeys[i];
//         const userDetailsString = localStorageobj[key];
//         const userDetailsObj = JSON.parse(userDetailsString);
//         showUser(userDetailsObj);
//     }
// });
// function showUser(user) {
//     document.getElementById("expense").value = "";
//     document.getElementById("description").value = "";
//     document.getElementById("category").value = "";

//     const parentNode = document.getElementById("listOfUsers");
//     const childHTML = `<li class="list-group-item" id=${user.expense}> ${user.expense}-${user.description}-${user.category} 
//   <button class="btn btn-danger float-right" onclick=deleteUser('${user.expense}')>delete</button>
//   <button class="btn btn-success float-right" onclick=editUserDetails('${user.expense}','${user.description}','${user.category}')>edit</button>
//     </li>`;
//     parentNode.innerHTML += childHTML;
// }
// function editUserDetails(expense, description, category) {
//     document.getElementById("expense").value = expense;
//     document.getElementById("description").value = description;
//     document.getElementById("category").value = category;
//     deleteUser(expense);
// }
// function deleteUser(expense) {
//     localStorage.removeItem(expense);
//     removeUser(expense);
// }
// function removeUser(expense) {
//     const parentNode = document.getElementById("listOfUsers");
//     const childNodeDelete = document.getElementById(expense);
//     if (childNodeDelete) {
//         parentNode.removeChild(childNodeDelete);
//     }
// }

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