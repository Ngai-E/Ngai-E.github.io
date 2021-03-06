
let converter = new Converter()
converter.getAllCurrencies()         //function to iterate through currencies
converter.showCachedCurrencies()      //funcion to cache currencies

//this function converts one currency to another
function convert(){
    let currentCurrency = document.getElementById("from").value;   //storing the from currency
    let destinationCurrency = document.getElementById("to").value;   //getting the to currency
    let value = document.getElementById("amount").value;           //getting the amout space

    let query = currentCurrency+"_"+destinationCurrency

    converter.getConversionRate(currentCurrency, destinationCurrency).then( response =>{ 
        const rate = response.currencyRate;
        const appStatus = response.appStatus;

        if(rate !== undefined){
            document.getElementById("result").innerHTML = rate * value
             if(appStatus ==='online') converter.addCurrencyRateToCache(rate, currentCurrency, destinationCurrency)
        }
        else 
            console.log("unable to convert")
    }).catch( error => {
        console.log('No rate was found in the cache: ');
        document.getElementById("result").innerHTML = "Can not convert. You seem to be offline"
    });

    // converter.getCurrencyRateFromCache(currentCurrency, destinationCurrency).then(response => {
    //     if (!response)
    //         fetch('https://free.currencyconverterapi.com/api/v5/convert?q='+query+'&compact=y&')
    //         .then(response => {
    //             return response.json();
    //         }).then(response => {
    //             console.log(response)
    //             // document.getElementById("result").innerHTML = value * response[query].val
    //         })
    // })

    // fetch(baseUrl+'convert?q='+query+'&compact=y&')
    // .then(response => {
    //     return response.json();
    // }).then(response => {
    //     document.getElementById("result").innerHTML = value * response[query].val
    // })
}