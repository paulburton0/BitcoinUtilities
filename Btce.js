function btcetest() { Logger.log(btceOrderbook("USD","bids")); Logger.log(btcePrice('USD', 'ask')); }
function btcePrice(currency, key) {
  if (currency == undefined || (key != "ask" && key != "bid"))
    return "currency must = LTC, USD, EUR, GBP, CAD, AUD, JPY, etc\nkey must = ask or bid" 

  var json = fetchJSON('https://btc-e.com/api/2/btc_'+currency.toLowerCase()+'/depth')
  if (json == 'err')
    return 'err'

  json = json[key+"s"].sort(function(a,b){return a[0]-b[0]})

  if (key == "ask")
    return parseFloat(json[0][0])
  else
    return parseFloat(json[json.length-1][0])
}

function btceOrderbook(currency, key) {
  if (currency == undefined || (key != "asks" && key != "bids"))
    return "currency must = LTC, USD, EUR, GBP, CAD, AUD, JPY, etc\nkey must = asks or bids" 

  var json = fetchJSON('https://btc-e.com/api/2/btc_'+currency.toLowerCase()+'/depth')
  if (json == 'err')
    return ['err','err']

  json = json[key]
  json = json.sort(function(item1,item2){
    a = parseFloat(item1[0]); b = parseFloat(item2[0]); // order price
    if (key === "bids")
      return a > b ? -1  // a gt b, put at beginning
           : a < b ? 1   // a lt b, put on end
           : 0           // equal
    else if (key === "asks")
      return a > b ? 1  
           : a < b ? -1 
           : 0          
    })
  return json
}

