document.getElementById("htmlCode").value = "<div>\n\n</div>";
document.getElementById("cssCode").value = "<style>\n\n</style>";
document.getElementById("jsCode").value = "<script>\n\n</script>";
let list = [];


const init = () => {
    const data = getDataFromStorage()
    displayData(data);
}
init()

function showPreview() {
    
    var htmlCode = document.getElementById("htmlCode").value;
    var cssCode = "" + document.getElementById("cssCode").value + "";
    var jsCode = "" + document.getElementById("jsCode").value + "";

    var frame = document.getElementById("preview-window").contentWindow.document;
    frame.open();
    frame.write(htmlCode + cssCode + jsCode);
    frame.close();
}

document.querySelectorAll("textarea").forEach(ele => {
    ele.addEventListener("change", () => {
        addData(ele.id)
    })
})

const addData = (item) => {
    const ele = document.querySelector(`#${item}`).value
    const obj = {
        [item]: ele || ''
    }
    list.push(obj)
    storeDataToStorage(list)
}

const storeDataToStorage = (list) => {
    localStorage.setItem("Data", JSON.stringify(list))
}

function getDataFromStorage() {
    if (localStorage.getItem("Data")) {
        list = JSON.parse(localStorage.getItem("Data"))
        return list
    }
    return []
}

function displayData(data) {
    data.forEach(ele => {
        if (ele) {
            Object.keys(ele).forEach(item => {
                document.querySelector(`#${item}`).value = ele[item]
                showPreview()
            })
        }
    })
}



function show(x) {
    document.getElementById("html").style.display = "none";
    document.getElementById("css").style.display = "none";
    document.getElementById("js").style.display = "none";
    document.getElementById("result").style.display = "none";
    document.getElementById(x).style.display = "block";
}

function show_all() {
    if (window.innerWidth >= 992) {
        document.getElementById("html").style.display = "block";
        document.getElementById("css").style.display = "block";
        document.getElementById("js").style.display = "block";
        document.getElementById("result").style.display = "block";
    }
    if (window.innerWidth < 992 && document.getElementById("html").style.display == "block") {
        document.getElementById("css").style.display = "none";
        document.getElementById("js").style.display = "none";
        document.getElementById("result").style.display = "none";
    }
}


document.querySelectorAll("textarea").forEach(ele => {
    ele.addEventListener("input", showPreview)
})