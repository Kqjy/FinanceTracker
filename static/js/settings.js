const deta = await import("https://cdn.deta.space/js/deta@2.0.0/deta.mjs");

const settings = deta.Base('settings');
var currentdate = new Date().toLocaleString('en-US',{hour12:false});

var settings_payload = {
    "username": "",
    "currency": ""
};

document.querySelector('#settingssave').addEventListener('click', async () => {
    var name = document.getElementById("displayname").value;
    if (name.trim() === "") {
        name = "Deta user";
    }
    var currency = document.getElementById("currencysymbol").value;
    settings_payload["username"] = name;
    settings_payload["currency"] = currency;
    await append_settingspayload();
});

async function append_settingspayload() {
    await settings.update({"username": settings_payload["username"], "currency": settings_payload["currency"], "theme": "default"}, "Profile1")
    console.log("Recorded settings data as of " + currentdate);
    var items = await settings.fetch();
    document.getElementById("displayname").value = items['items'][0]['username'];
};