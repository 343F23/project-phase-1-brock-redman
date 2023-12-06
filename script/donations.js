let docBody = document.querySelector("body");

let donationInput = document.getElementById("donationForm");

let addButton = document.getElementById("add");
let clearButton = document.getElementById("clear");


// Array to store table data
let donationTableData = new Array();

/**
 * Remove this tables data from local storage
 */
clearButton.addEventListener("click", (e) => { 
    e.preventDefault();
    localStorage.removeItem("donationTableData");
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
    let donationTable = document.getElementById("donationTable");
         
    let numRows = donationTable.rows.length;
    console.log(numRows);
    while (--numRows && numRows > 0) {
        donationTable.deleteRow(numRows);
    }
    
    count = 1;
    let numElements = 0;
    for (let i = 0; i < donationTable.rows.length; i++) {
         let newEntry = document.createElement("tr");
         newEntry.id = count;
         let id = document.createElement("td");
         let nameInput = document.createElement("td");
         nameInput.contentEditable = true;

         let opptypeInput = document.createElement("td");
         opptypeInput.contentEditable = true;

         let amountInput = document.createElement("td");
         amountInput.contentEditable = true;

         let typeInput = document.createElement("td");
         typeInput.contentEditable = true;

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
            donationTableData[i].name = nameInput.innerText
            donationTableData[i].opptype = opptypeInput.innerText;
            donationTableData[i].amount = amountInput.innerText;
            donationTableData[i].type = typeInput.innerText;

             localStorage.setItem('donationTableData', JSON.stringify(donationTableData));
             createBlob();
        });

        deleteBtn.addEventListener("click", (event) => {
             event.preventDefault();
             numElements--;
             index = newEntry.id;
              
             donationTableData.splice(numElements, 1); 
             localStorage.setItem('donationTableData', JSON.stringify(donationTableData));
             createBlob();
             deleteRow(index);                
        });

        option.append(updateBtn);
        option.append(deleteBtn);
              
         // Create table cells
        id.innerText = count; 
        nameInput.innerText = donationTableData[i].name;
        opptypeInput.innerText = donationTableData[i].opptype;
        amountInput.innerText = donationTableData[i].amount;
        typeInput.innerText = donationTableData[i].type;

         newEntry.appendChild(id);
         newEntry.appendChild(nameInput)
         newEntry.appendChild(opptypeInput);
         newEntry.appendChild(amountInput);
         newEntry.appendChild(typeInput);
         newEntry.appendChild(option);
         donationTable.appendChild(newEntry);
         count++;
         numElements++;
    }          
}

/**
 * Add an entry and update local storage
 */
function addEntryToLocalStage() {
    getDataFromLocalStorage();
    donationTableData.push({
        name:        document.getElementById("name").value,
        opptype:     document.getElementById("opptype").value,
        amount:      document.getElementById("amount").value,
        type:        document.getElementById("type").value
    });

    localStorage.setItem("donationTableData", JSON.stringify(donationTableData));
    createBlob();
}


function createBlob() {
    const donationBlob = new Blob([JSON.stringify(donationTableData)], {
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
    let tableData = localStorage.getItem("donationTableData");
    if (tableData != null) {
        donationTableData = JSON.parse(tableData)
    }
}