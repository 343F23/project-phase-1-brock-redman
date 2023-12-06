let docBody = document.querySelector("body");

let savingsInput = document.getElementById("savingsForm");

let savingsTableData = new Array();

let addButton = document.getElementById("add");
let clearButton = document.getElementById("clear");

/**
 * Remove this tables data from local storage
 */
clearButton.addEventListener("click", (e) => { 
    e.preventDefault();
    localStorage.removeItem("savingsTableData");
});

/**
 * Add an entry to the table
 */
addButton.addEventListener("click", (e) => { 
    e.preventDefault();
    addEntryToLocalStage();
    showSavingsTableData();
});
      
showSavingsTableData();

/**
 * Function to rebuild the HTML table on refresh
 */
function showSavingsTableData() {
    getDataFromLocalStorage();
    let savingsTable = document.getElementById("savingsTable");
         
    let numRows = savingsTable.rows.length;
         
    while (--numRows && numRows > 0) {
      savingsTable.deleteRow(numRows);
    }

    count = 1;
    let numElements = 0;
    for (let i = 0; i < savingsTable.rows.length; i++) {
        let newEntry = document.createElement("tr");
        newEntry.id = count;
        let id = document.createElement("td");
        let bankInput = document.createElement("td");
        bankInput.contentEditable = true;

        let membershipInput = document.createElement("td");
        membershipInput.contentEditable = true;

        let balanceInput = document.createElement("td");
        balanceInput.contentEditable = true;

        let contractInput = document.createElement("td");
        contractInput.contentEditable = true;

        let option = document.createElement("td");

        let deleteBtn = document.createElement("button");
        let updateBtn = document.createElement("button");

        updateBtn.innerText = "update";
        updateBtn.style.backgroundColor = "blue";
        updateBtn.style.color = "white";

        deleteBtn.innerText = "delete";
        deleteBtn.style.backgroundColor = "red";
        deleteBtn.style.color = "white"

        updateBtn.addEventListener("click", (event) => {
            event.preventDefault();
           // console.log("here");
           savingsTableData[i].bank = bankInput.innerText;
           savingsTableData[i].membership = membershipInput.innerText;
           savingsTableData[i].balance = balanceInput.innerText;
           savingsTableData[i].contract = contractInput.innerText;

            
           localStorage.setItem('savingsTableData', JSON.stringify(savingsTableData));
           createBlob();
        });

        deleteBtn.addEventListener("click", (event) => {
            event.preventDefault();
            numElements--;
            index = newEntry.id;
              
            savingsTableData.splice(numElements, 1); 
            localStorage.setItem('savingsTableData', JSON.stringify(savingsTableData));
            createBlob();
            deleteRow(index);                
        });

        option.append(updateBtn);
        option.append(deleteBtn);
              

        // Create table cells
        id.innerText = count;
        bankInput.innerText = savingsTableData[i].bank;
        membershipInput.innerText = savingsTableData[i].membership;
        balanceInput.innerText = savingsTableData[i].balance;
        contractInput.innerText = savingsTableData[i].contract;
        
        newEntry.appendChild(id);
        newEntry.appendChild(bankInput)
        newEntry.appendChild(membershipInput);
        newEntry.appendChild(balanceInput);
        newEntry.appendChild(contractInput);
        newEntry.appendChild(option);
        savingsTable.appendChild(newEntry);
        count++;
        numElements++;
    }          
}

/**
 * Add an entry and update local storage
 */
function addEntryToLocalStage() {
    getDataFromLocalStorage();
    savingsTableData.push({
        bank:            document.getElementById("bank").value,
        membership:      document.getElementById("membership").value,
        balance:         document.getElementById("balance").value,
        contract:        document.getElementById("contract").value
    });

    localStorage.setItem("savingsTableData", JSON.stringify(savingsTableData));
    createBlob();
}

function createBlob() {
    const savingsBlob = new Blob([JSON.stringify(savingsTableData)], {
        type: "application/json",
      });
}

/**
 * Remove the selected row from the DOM
 * @param {"Selected row"} rowid  
 */
function deleteRow(rowid) {   
    let row = document.getElementById(rowid);
    row.parentNode.removeChild(row);
} 

/**
 * Grab a fresh copy of the table data from local storage
 */
function getDataFromLocalStorage() {
    let tableData = localStorage.getItem("savingsTableData");
    if (tableData != null) {
      savingsTableData = JSON.parse(tableData)
    }
} 