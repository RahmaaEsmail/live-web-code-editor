document.getElementById("htmlCode").value="<div>\n\n</div>";
document.getElementById("cssCode").value="<style>\n\n</style>";
document.getElementById("jsCode").value="<script>\n\n</script>";
let list = [];

const init = () => {
    const data = getData()
    displayData(data);
}
init()

function showPreview(){
    var htmlCode = document.getElementById("htmlCode").value;
    var cssCode = ""+document.getElementById("cssCode").value+"";
    var jsCode = ""+document.getElementById("jsCode").value+"";
    
    var frame = document.getElementById("preview-window").contentWindow.document;
    frame.open();
    frame.write(htmlCode+cssCode+jsCode);
    frame.close();
}

document.querySelectorAll("textarea").forEach(ele => {
    ele.addEventListener("change",()=>{
       addData(ele.id)
    })
})

const addData = (item) => {
    const ele = document.querySelector(`#${item}`).value
    const obj = {
        [item]: ele || ''
    }
    list.push(obj)
    storeData(list)
}

const storeData = (list) => {
    localStorage.setItem("Data", JSON.stringify(list))
}

function getData (){
    if(localStorage.getItem("Data")) {
     list = JSON.parse(localStorage.getItem("Data"))
     return list
    }
    return []
}

function displayData  (data) {
   data.forEach(ele => {
       var frame = document.getElementById("preview-window").contentWindow.document;
       if(ele['htmlCode']) 
       frame.write(ele["htmlCode"]);
       if(ele["cssCode"]) 
       frame.write(ele['cssCode']);
       if(ele['jsCode'])
       frame.write(ele['jsCode'])
    })
}



function show(x){
    document.getElementById("html").style.display="none";
    document.getElementById("css").style.display="none";
    document.getElementById("js").style.display="none";
    document.getElementById("result").style.display="none";
    document.getElementById(x).style.display="block";
}

function show_all(){
    if(window.innerWidth>=992)
    {
        document.getElementById("html").style.display="block";
        document.getElementById("css").style.display="block";
        document.getElementById("js").style.display="block";
        document.getElementById("result").style.display="block";
    }
    if(window.innerWidth<992 && document.getElementById("html").style.display=="block")
    {
        document.getElementById("css").style.display="none";
        document.getElementById("js").style.display="none";
        document.getElementById("result").style.display="none";
    }
}

