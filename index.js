let myLead = [];
const inputBtn = document.getElementById("input-btn");
const tabBtn = document.getElementById("tab-btn");
const deleteBtn = document.getElementById("dlt-btn");
const inputEl = document.getElementById("input-el");
const ulEl = document.getElementById("ul-el");

//get item from local storage
const leadStorage = JSON.parse(localStorage.getItem("myLead"));

if(leadStorage){
    myLead = leadStorage;
    renderLogs(myLead);
}

function renderLogs(leadArray){
    let listItem = "";
    for(let i = 0; i < leadArray.length; i++){
    
    listItem += 
    `<li>
        <a target='_blank' href='${leadArray[i]}'>
            ${leadArray[i]}
        </a>
    </li>`;


    /*
    create HTML element-another method to change javscript into html
    const li = document.createElement("li");
    li.textContent = myLead[i];
    ulEl.append(li);
    */
    }

    ulEl.innerHTML = listItem;
}

//event listerner for save tab
tabBtn.addEventListener("click", function(){
    //grab the current url tab
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLead.push(tabs[0].url);
        localStorage.setItem("myLead", JSON.stringify(myLead));
        renderLogs(myLead);;
    });
})

//event listener for delete all
deleteBtn.addEventListener("dblclick", function(){
    localStorage.clear();
    myLead = [];
    renderLogs(myLead);
})

//this is event listener for input
inputBtn.addEventListener("click", function(){
    myLead.push(inputEl.value);
    inputEl.value = "";

    //save the myLead array into localStorage
    //JSON.stringify - change array into string
    //JSON.parse - turn String into array
    localStorage.setItem("myLead", JSON.stringify(myLead));

    renderLogs(myLead);
    console.log(myLead);
});
