const textareaHtmlCode = document.getElementById("htmlCode");
const textareaCssCode = document.getElementById("cssCode");
const textareaJsCode = document.getElementById("jsCode");

const validateCode = (code) => {
    try {
        eval(code)
    }
    catch(err) {
        return {
            success : false,
            err
        }
    }

    return {
        success : true
    }
}

const showPreview = ()=>{
    const frame = document.getElementById("preview-window").contentWindow.document;
    const jsValidation = validateCode(textareaJsCode.value);
    if(!jsValidation.success)
      alert('Error in JavaScript code.' + jsValidation.err)

    frame.open();
    frame.write(`
    ${textareaHtmlCode.value}
    <style>${textareaCssCode.value}</style>
    <script>${textareaJsCode.value}</script>
    `)
    frame.close()
}

const storeDataToStorage = ()=>{
    localStorage.setItem("Data",JSON.stringify({
        html : textareaHtmlCode.value,
        css : textareaCssCode.value,
        js : textareaJsCode.value
    }))
}

const getDataFromStorage = ()=> {
    if(localStorage.getItem('Data'))
      return JSON.parse(localStorage.getItem("Data"))
    return ({
        html:"",
        css:"",
        js:""
    })
}

const displayData = ({html,css,js})=> {
    textareaHtmlCode.value = html;
    textareaCssCode.value = css;
    textareaJsCode.value = js
}

const initTxtArea = ()=> {
    document.querySelectorAll("textarea").forEach(text => {
        text.addEventListener("change", () => {
            showPreview()
            storeDataToStorage()
        })
    })
}


const init = ()=> {
    const data = getDataFromStorage()
    displayData(data)
    showPreview()
    initTxtArea()
}
init()