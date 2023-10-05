function nextsection(current, next) {
    var currentid = "section" + current;
    var nextid = "section" + next;
    document.getElementById(currentid).style.display = "none";
    document.getElementById(nextid).style.display = "block";
}

function finish() {
    window.location.href = "/"
}