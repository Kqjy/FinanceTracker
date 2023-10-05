function load_form(select) {
    if (document.getElementsByClassName("headlessui")[0])
    {
        return
    }
    var panel = document.createElement("div");
    panel.setAttribute("class","headlessui");
    var panelback = document.createElement("div");
    panelback.setAttribute("class","headlessui-back");
    var inpanel = document.createElement("div");
    inpanel.setAttribute("class","some-form")
    var form = document.createElement("form");
    form.id = "form-update";
    var paneltitle = document.createElement("h3");
    paneltitle.textContent = "Add " + select;
    paneltitle.style.textAlign = "center";
    var value = document.createElement("input");
    value.setAttribute("type","number");
    value.setAttribute("name","value");
    value.setAttribute("placeholder","0.00");
    value.setAttribute("value","0.00");
    value.setAttribute("min","0");
    value.setAttribute("step","0.01");
    value.setAttribute("class","some-form-input");
    value.setAttribute("id", "form-value")
    var valuelabel = document.createElement("label");
    var currencysymbol = document.getElementById("currencysymbol").textContent;
    valuelabel.textContent = "Amount " + currencysymbol;
    var note = document.createElement("input");
    note.setAttribute("type","text");
    note.setAttribute("maxlength","32");
    note.setAttribute("class","some-form-input");
    note.setAttribute("id","form-note");
    var notelabel = document.createElement("label");
    notelabel.textContent = "Set a note (max 32 characters)";
    var category = document.createElement('select');
    category.setAttribute("type","text");
    category.setAttribute("name","category");
    category.setAttribute("id","form-category");
    category.setAttribute("class","some-form-input some-form-select");
    if (select === "Income") {
        category_options = ["salary", "scholarship", "grant", "gift", "others"];
    }
    else if (select === "Expense") {
        category_options = ["food", "drink", "transportation", "bill", "gift", "mobile", "games", "lottery", "hobby", "others"];
    }
    else
    {
        category_options = ["leisure", "emergency fund", "others"];
    }
    for (let catop = 0; catop < category_options.length; catop++) {
        var option = document.createElement("option");
        option.setAttribute("value",toTitleCase(category_options[catop]));
        option.textContent = toTitleCase(category_options[catop]);
        category.appendChild(option);
    }
    var categorylabel = document.createElement("label");
    categorylabel.textContent = "Category";
    var submit = document.createElement("input");
    submit.setAttribute("type","submit");
    submit.setAttribute("value","Confirm");
    submit.setAttribute("class","some-form-button");
    submit.setAttribute('onclick','add'+select+'()');
    submit.setAttribute("id","form-button-submit-" + select);
    var cancel = document.createElement("button");
    cancel.textContent = "Cancel";
    cancel.setAttribute("type","button");
    cancel.setAttribute("onclick","cancelform()");
    cancel.setAttribute("class","some-form-button");
    var div_panelbot = document.createElement("div");
    div_panelbot.setAttribute("class", "some-form-buttons-div");
    div_panelbot.appendChild(cancel);
    div_panelbot.appendChild(submit);
    form.appendChild(paneltitle);
    form.appendChild(valuelabel);
    form.appendChild(value);
    form.appendChild(notelabel);
    form.appendChild(note);
    form.appendChild(categorylabel);
    form.appendChild(category);
    form.appendChild(div_panelbot);
    inpanel.appendChild(form);
    panel.appendChild(inpanel);
    panelback.appendChild(panel);
    document.body.appendChild(panelback);
    document.body.setAttribute("style", "overflow: hidden;");
}

function cancelform() {
    document.getElementsByClassName("headlessui-back")[0].remove();
    document.body.setAttribute("style", "");
}


function toTitleCase(str) {
    return str.toLowerCase().split(' ').map(function (word) {
      return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ');
  }