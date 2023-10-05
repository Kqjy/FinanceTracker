const deta = await import("https://cdn.deta.space/js/deta@2.0.0/deta.mjs");

const income = deta.Base('income');
const expense = deta.Base('expense');
const settings = deta.Base('settings');
//
//await base.putMany(['a', 'b', 'c', 'd']);
//await drive.put('a', {data: 'data'});
//await drive.put('b', {data: 'data'});
//await drive.put('c', {data: 'data'});
//await drive.put('d', {data: 'data'});
//
//console.log(await base.fetch());
//console.log(await drive.list());

var currentdate = new Date().toLocaleString('en-US',{hour12:false});

document.querySelector('#section2button').addEventListener('click', async () => {
        var input = document.getElementById("section2text").value;
        if (input.trim() === "") {
            alert("Invalid Input.");
            return;
        }
        if (input < 0) {
            await expense.put({"value": parseFloat(input), "note": "Negative Capital", "timestamp": currentdate, "type": "Expense", "category": "Debt"});
        }
        else {
            await income.put({"value": parseFloat(input), "note": "Capital", "timestamp": currentdate, "type": "Income", "category": "Capital"});
        }      
        nextsection(2, 3);
        console.log("Recorded transaction of " + input + " as of " + currentdate);
    });

var settings_payload = {
    "username": "",
    "currency": ""
};

document.querySelector('#section3button').addEventListener('click', async () => {
        var input = document.getElementById("section3text").value;
        if (input.trim() === "") {
            input = "Deta User";
        }
        settings_payload["username"] = input;
        nextsection(3, 4);
    });

document.querySelector('#section4button').addEventListener('click', async () => {
        var input = document.getElementById("section4text").value;
        settings_payload["currency"] = input;
        await append_settingspayload();
        nextsection(4, 5);
    });

async function append_settingspayload() {
    await settings.put({"key": "Profile1","username": settings_payload["username"], "currency": settings_payload["currency"], "theme": "default"})
    console.log("Recorded settings data as of " + currentdate);
}

