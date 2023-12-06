
let docBody = document.querySelector("body");
let symbolForm = document.getElementById("symbolForm");

let company = "";
let symbol = "";

let graphTableData = new Array();

/**
 * If there is graph data display the graph
 */
if (localStorage.getItem("graphTableData") != null) {
    showGraph();
}

/**
 * Search for the stock symbol using the API then call the next API to 
 * display the data.
 */
symbolForm.addEventListener("submit", async (e) => { 
    e.preventDefault();
    findAndCreateGraph();
});


let graphForm = document.getElementById("graphForm");

/**
 * Manually input stock symbol using the API to 
 * display the data.
 */
graphForm.addEventListener("submit", async (e) => { 
    e.preventDefault();
    changeGraph();
});

/**
 * Using the company name inputted by the user, find the symbol using the first
 * API and then using the result find the data to create the graph of the associated
 * symbol.
 */
async function findAndCreateGraph() {
    let company = document.getElementById("company").value;

    const url1 = `https://financialmodelingprep.com/api/v3/search?query=${company}&apikey=1cd4f39a85c007f5bd6ef52e87bdb502`
    try {
	    const response = await fetch(url1);
	    const result = await response.json();
        symbol = result[1]["symbol"];

        let p = document.getElementById("result");
        p.innerHTML = "Result: " + symbol + " OR";

        const url = `https://alpha-vantage.p.rapidapi.com/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=compact&datatype=json`;
    
        console.log("url", url1);
        const options = {
	        method: 'GET',
	        headers: {
		        'X-RapidAPI-Key': '198b3010d1mshcd73076a9db4f5cp1ac41ajsn645ec1a6083f',
		        'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com'
	        }
        };

        try {
	        const response = await fetch(url, options);
	        const result = await response.json();
            localStorage.removeItem("graphTableData");

            localStorage.setItem("graphTableData", JSON.stringify(result));
            getDataFromLocalStorage();
            showGraph();
    
    } catch (error) {
        console.error(error);
    }
    } catch (error) {
	    console.error(error);
    }
}

/**
 * Function to update the graph to show data with a new user search
 */
async function changeGraph () {
    let symbol = document.getElementById("graphData").value;

    const url = `https://alpha-vantage.p.rapidapi.com/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=compact&datatype=json`;
    
    console.log("url", url);
    const options = {
	    method: 'GET',
	    headers: {
		    'X-RapidAPI-Key': '198b3010d1mshcd73076a9db4f5cp1ac41ajsn645ec1a6083f',
		    'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com'
	    }
    };
    
    try {
	    const response = await fetch(url, options);
	    const result = await response.json();
        localStorage.removeItem("graphTableData");
        localStorage.setItem("graphTableData", JSON.stringify(result));
        getDataFromLocalStorage();
        showGraph();
    } catch (error) {
	    console.error(error);
    }
}

/**
 * Show the current graph
 */
function showGraph() {
    getDataFromLocalStorage();
        
    let highTradePriceOnly = graphTableData['Time Series (Daily)'];

    let closeEntries = new Array();
    if (highTradePriceOnly != null) {
        var keys = Object.keys(highTradePriceOnly);

        for (var key in highTradePriceOnly) { 
            if (highTradePriceOnly.hasOwnProperty(key)) {
                closeEntries.push(highTradePriceOnly[key]["2. high"]);
            }
        }
        
        new Chart("myChart", {
        type: "line",
        data: {
            labels: keys,
            datasets: [{
            data: closeEntries
            }]
        },
        options: {
            legend: {display: false},
            title: {
            display: true,
            text: "Highs"
            }
        }
        });
    }
}

/**
 * Grab a fresh copy of data from local storage
 */
function getDataFromLocalStorage() {
    let tableData = localStorage.getItem("graphTableData");
    if (tableData != null) {
        graphTableData = JSON.parse(tableData)
    }
  }