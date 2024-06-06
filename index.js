let listOfLeads = []
let inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
let ulEl = document.getElementById("ul-el")
let deleteBtn = document.getElementById("delete-btn")
let tabBtn = document.getElementById("tab-btn")

let leadsFromlocalStorage = JSON.parse(localStorage.getItem("myLeads"))
if(leadsFromlocalStorage){
    listOfLeads = leadsFromlocalStorage
    rendere();
}


tabBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs){
        listOfLeads.push(tabs[0].url)
        localStorage.setItem("myLeads" , JSON.stringify(listOfLeads))
        rendere()
      });
})

inputBtn.addEventListener("click", function(){
    listOfLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads" , JSON.stringify(listOfLeads))
    rendere()
})


deleteBtn.addEventListener("click", function(){
    listOfLeads = []
    inputEl.value = ""
    localStorage.setItem("myLeads" , JSON.stringify(listOfLeads))
    rendere()
}) 

function rendere() {
    let listItem = ''
    for (let i = 0; i < listOfLeads.length; i++) {
        listItem +=
        `
            <li> 
                <a target = '_blank' href="${listOfLeads[i]}"> ${listOfLeads[i]} </a>
            </li>
        `
    }
    ulEl.innerHTML = listItem
}
