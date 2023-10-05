const deta = await import("https://cdn.deta.space/js/deta@2.0.0/deta.mjs");

const income = deta.Base('income');
const expense = deta.Base('expense');
const savings = deta.Base('savings');
const settings = deta.Base('settings');
var currentdate = new Date().toLocaleString('en-US',{hour12:false});

var incomevalue = 0;
var expensevalue = 0;
var savingsvalue = 0;

async function load_dashboard() {
    incomevalue = 0;
    expensevalue = 0;
    savingsvalue = 0;
    var settingsdata = await settings.fetch();
    var incomedata = await income.fetch();
    var expensedata = await expense.fetch();
    var savingsdata = await savings.fetch();
    for (let x = 0; x < incomedata['items'].length; x++) {
        incomevalue += incomedata['items'][x]['value'];
    }
    for (let x = 0; x < expensedata['items'].length; x++) {
        expensevalue += expensedata['items'][x]['value'];
    }
    for (let x = 0; x < savingsdata['items'].length; x++) {
        savingsvalue += savingsdata['items'][x]['value'];
    }
    document.getElementById('currencysymbol').textContent = settingsdata['items'][0]['currency'];
    document.getElementById('displayname').textContent = settingsdata['items'][0]['username'];
    var balance = incomevalue - expensevalue - savingsvalue;
    document.getElementById('totalvalue').textContent = parseFloat(balance.toFixed(2)).toLocaleString('en');
    var mergeddata = []
    var mergeddata = mergeddata.concat(incomedata['items']).concat(expensedata['items']).concat(savingsdata['items']);
    mergeddata.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    var transactionhistory = document.getElementById('transactionsection');
    transactionhistory.innerHTML = "";
    for (let x = 0; x < mergeddata.length; x++) {
        var div = document.createElement('div');
        div.setAttribute('id', "thoverall" + mergeddata[x]['key']);
        div.setAttribute('class', 'transactiondiv ' + 'transaction' + mergeddata[x]['type']);
        var date = mergeddata[x]['timestamp'].slice(0, 10).replace(",", " ").replace(" ", "");
        var title = document.createElement('p');
        title.setAttribute('class', 'transactiontitle');
        title.textContent = "[" + date + "] " + mergeddata[x]['type'];
        var category = document.createElement('span');
        category.textContent = ": " + mergeddata[x]['category'];
        if (mergeddata[x]['type'] === "Income") {
            var plusorminus = "+";
        }
        else {
            var plusorminus = "-";
        }
        var value = document.createElement('p');
        value.setAttribute('class', 'transactionvalue');
        value.textContent = plusorminus + settingsdata['items'][0]['currency'] + mergeddata[x]['value'];
        var note = document.createElement('p');
        note.setAttribute('class', 'transactionnote');
        note.textContent = mergeddata[x]['note'];
        var deletebutton = document.createElement('button');
        deletebutton.textContent = "Delete";
        deletebutton.setAttribute('class', 'transactionbutton');
        deletebutton.setAttribute('id', 'deletetrans' + mergeddata[x]['key']);
        deletebutton.setAttribute('value', mergeddata[x]['type']);
        deletebutton.setAttribute('onclick', 'deletetransaction(this.id)');
        div.appendChild(title);
        title.appendChild(category);
        div.appendChild(value);
        div.appendChild(note);
        div.appendChild(deletebutton);
        transactionhistory.appendChild(div);
    }
};

async function load_income() {
    var settingsdata = await settings.fetch();
    var incomedata = await income.fetch();
    for (let x = 0; x < incomedata['items'].length; x++) {
        incomevalue += incomedata['items'][x]['value'];
    }
    document.getElementById('currencysymbol').textContent = settingsdata['items'][0]['currency'];
    document.getElementById('totalvalue').textContent = parseFloat(incomevalue.toFixed(2)).toLocaleString('en');
    var mergeddata = []
    var mergeddata = mergeddata.concat(incomedata['items']);
    mergeddata.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    var transactionhistory = document.getElementById('transactionsection');
    for (let x = 0; x < mergeddata.length; x++) {
        var div = document.createElement('div');
        div.setAttribute('id', "thoverall" + mergeddata[x]['key']);
        div.setAttribute('class', 'transactiondiv ' + 'transaction' + mergeddata[x]['type']);
        var date = mergeddata[x]['timestamp'].slice(0, 10).replace(",", " ").replace(" ", "");
        var title = document.createElement('p');
        title.setAttribute('class', 'transactiontitle');
        title.textContent = "[" + date + "] " + mergeddata[x]['type'];
        var category = document.createElement('span');
        category.textContent = ": " + mergeddata[x]['category'];
        var plusorminus = "+";
        var value = document.createElement('p');
        value.setAttribute('class', 'transactionvalue');
        value.textContent = plusorminus + settingsdata['items'][0]['currency'] + mergeddata[x]['value'];
        var note = document.createElement('p');
        note.setAttribute('class', 'transactionnote');
        note.textContent = mergeddata[x]['note'];
        var deletebutton = document.createElement('button');
        deletebutton.textContent = "Delete";
        deletebutton.setAttribute('class', 'transactionbutton');
        deletebutton.setAttribute('id', 'deletetrans' + mergeddata[x]['key']);
        deletebutton.setAttribute('value', mergeddata[x]['type']);
        deletebutton.setAttribute('onclick', 'deletetransaction(this.id)');
        div.appendChild(title);
        title.appendChild(category);
        div.appendChild(value);
        div.appendChild(note);
        div.appendChild(deletebutton);
        transactionhistory.appendChild(div);
    }
};

async function load_savings() {
    var settingsdata = await settings.fetch();
    var savingsdata = await savings.fetch();
    for (let x = 0; x < savingsdata['items'].length; x++) {
        savingsvalue += savingsdata['items'][x]['value'];
    }
    document.getElementById('currencysymbol').textContent = settingsdata['items'][0]['currency'];
    document.getElementById('totalvalue').textContent = parseFloat(savingsvalue.toFixed(2)).toLocaleString('en');
    var mergeddata = []
    var mergeddata = mergeddata.concat(savingsdata['items']);
    mergeddata.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    var transactionhistory = document.getElementById('transactionsection');
    for (let x = 0; x < mergeddata.length; x++) {
        var div = document.createElement('div');
        div.setAttribute('id', "thoverall" + mergeddata[x]['key']);
        div.setAttribute('class', 'transactiondiv ' + 'transaction' + mergeddata[x]['type']);
        var date = mergeddata[x]['timestamp'].slice(0, 10).replace(",", " ").replace(" ", "");
        var title = document.createElement('p');
        title.setAttribute('class', 'transactiontitle');
        title.textContent = "[" + date + "] " + mergeddata[x]['type'];
        var category = document.createElement('span');
        category.textContent = ": " + mergeddata[x]['category'];
        var plusorminus = "+";
        var value = document.createElement('p');
        value.setAttribute('class', 'transactionvalue');
        value.textContent = plusorminus + settingsdata['items'][0]['currency'] + mergeddata[x]['value'];
        var note = document.createElement('p');
        note.setAttribute('class', 'transactionnote');
        note.textContent = mergeddata[x]['note'];
        var deletebutton = document.createElement('button');
        deletebutton.textContent = "Delete";
        deletebutton.setAttribute('class', 'transactionbutton');
        deletebutton.setAttribute('id', 'deletetrans' + mergeddata[x]['key']);
        deletebutton.setAttribute('value', mergeddata[x]['type']);
        deletebutton.setAttribute('onclick', 'deletetransaction(this.id)');
        div.appendChild(title);
        title.appendChild(category);
        div.appendChild(value);
        div.appendChild(note);
        div.appendChild(deletebutton);
        transactionhistory.appendChild(div);
    }
};

async function load_expense() {
    var settingsdata = await settings.fetch();
    var expensedata = await expense.fetch();
    for (let x = 0; x < expensedata['items'].length; x++) {
        expensevalue += expensedata['items'][x]['value'];
    }
    document.getElementById('currencysymbol').textContent = settingsdata['items'][0]['currency'];
    document.getElementById('totalvalue').textContent = parseFloat(expensevalue.toFixed(2)).toLocaleString('en');
    var mergeddata = []
    var mergeddata = mergeddata.concat(expensedata['items']);
    mergeddata.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    var transactionhistory = document.getElementById('transactionsection');
    for (let x = 0; x < mergeddata.length; x++) {
        var div = document.createElement('div');
        div.setAttribute('id', "thoverall" + mergeddata[x]['key']);
        div.setAttribute('class', 'transactiondiv ' + 'transaction' + mergeddata[x]['type']);
        var date = mergeddata[x]['timestamp'].slice(0, 10).replace(",", " ").replace(" ", "");
        var title = document.createElement('p');
        title.setAttribute('class', 'transactiontitle');
        title.textContent = "[" + date + "] " + mergeddata[x]['type'];
        var category = document.createElement('span');
        category.textContent = ": " + mergeddata[x]['category'];
        var plusorminus = "+";
        var value = document.createElement('p');
        value.setAttribute('class', 'transactionvalue');
        value.textContent = plusorminus + settingsdata['items'][0]['currency'] + mergeddata[x]['value'];
        var note = document.createElement('p');
        note.setAttribute('class', 'transactionnote');
        note.textContent = mergeddata[x]['note'];
        var deletebutton = document.createElement('button');
        deletebutton.textContent = "Delete";
        deletebutton.setAttribute('class', 'transactionbutton');
        deletebutton.setAttribute('id', 'deletetrans' + mergeddata[x]['key']);
        deletebutton.setAttribute('value', mergeddata[x]['type']);
        deletebutton.setAttribute('onclick', 'deletetransaction(this.id)');
        div.appendChild(title);
        title.appendChild(category);
        div.appendChild(value);
        div.appendChild(note);
        div.appendChild(deletebutton);
        transactionhistory.appendChild(div);
    }
};

const pageurl = window.location.pathname;
if (pageurl === "/") {
    load_dashboard();
}
if (pageurl === "/income") {
    load_income();
}
if (pageurl === "/expense") {
    load_expense();
}
if (pageurl === "/savings") {
    load_savings();
}

window.addIncome = async () => {
    var input = document.getElementById("form-value").value;
    var note = document.getElementById("form-note").value;
    var category = document.getElementById("form-category").value;
    if (input.trim() === "" || parseFloat(input) < 0) {
        alert("Invalid Input.");
        return;
    }
    await income.put({"value": parseFloat(input), "note": note, "timestamp": currentdate, "type": "Income", "category": category});
    console.log("Recorded transaction of " + input + " as of " + currentdate);
}
window.addExpense = async () => {
    var input = document.getElementById("form-value").value;
    var note = document.getElementById("form-note").value;
    var category = document.getElementById("form-category").value;
    if (input.trim() === "" || parseFloat(input) < 0) {
        alert("Invalid Input.");
        return;
    }
    await expense.put({"value": parseFloat(input), "note": note, "timestamp": currentdate, "type": "Expense", "category": category});
    console.log("Recorded transaction of " + input + " as of " + currentdate);
}
window.addSaving = async () => {
    var input = document.getElementById("form-value").value;
    var note = document.getElementById("form-note").value;
    var category = document.getElementById("form-category").value;
    if (input.trim() === "" || parseFloat(input) < 0) {
        alert("Invalid Input.");
        return;
    }
    await savings.put({"value": parseFloat(input), "note": note, "timestamp": currentdate, "type": "Savings", "category": category});
    console.log("Recorded transaction of " + input + " as of " + currentdate);
}

window.deletetransaction = async (clicked_id) => {
    var type = document.getElementById(clicked_id).value;
    let getkey = clicked_id.replace("deletetrans", "");
    document.getElementById("thoverall"+getkey).remove();
    if (type === "Income") {
        await income.delete(getkey);
    }
    else if (type === "Expense") {
        await expense.delete(getkey);
    }
    else {
        await savings.delete(getkey);
    }
    load_dashboard();
}