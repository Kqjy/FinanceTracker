function sidepanel_open() {
    document.getElementById("sidepanel").style.width = "250px";
    document.getElementById("sidepanel").style.display = "block";
    document.getElementById("openSidepanel").style.display = 'none';
    if (window.innerWidth >= 800) {
        document.getElementById("main").style.marginLeft = "250px";
    }
    if (window.innerWidth <= 800) {
        window.scrollTo(0, 0);
        document.body.setAttribute("style", "overflow: hidden;");
    }
}
function sidepanel_close() {
    document.getElementById("main").style.marginLeft = "0%";
    document.getElementById("sidepanel").style.display = "none";
    document.getElementById("openSidepanel").style.display = "inline-block";
    document.body.setAttribute("style", "");
}

window.addEventListener("resize", function(event) {
    if (window.innerWidth <= 800) {
        document.getElementById("main").style.marginLeft = "0%";
        document.getElementById("sidepanel").style.position = "absolute";   
        if (document.getElementById("sidepanel").style.display === 'block') {
            window.scrollTo(0, 0);
            document.body.setAttribute("style", "overflow: hidden;");
        }    
    }
    else {
        if (document.getElementById("sidepanel").style.display === 'block')
        {
            document.body.setAttribute("style", "");
            document.getElementById("main").style.marginLeft = "250px";
            document.getElementById("sidepanel").style.position = "fixed";           
            document.body.setAttribute("style", "");
        }
    }
})