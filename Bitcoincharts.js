function bitcoinchartsMarketPrice(symbol, key) {
  // given a symbol (ex: "mtgoxUSD") and key (ex: "ask" or "bid")
  // return the value from the Bitcoincharts Markets data
  var error = ""
 
  var json = fetchJSON('http://bitcoincharts.com/t/markets.json')
 
  //
  // Check that symbol, key arguments are available in JSON data
  // return helpful error message if not
  //
  var symbols = []
  for(var i = 0; i < json.length; i++)
    symbols.push(json[i].symbol)
  
  if (symbols.indexOf(symbol) == -1)
    error += "symbol argument not one of: "+symbols.join(", ")+"\n"

  var keys = Object.keys(json[0]) // assumes keys available same for all
  if (keys.indexOf(key) == -1)
    error += "key argument not one of: "+keys.join(", ")
  
  if (error != "")
    return error

  // Return requested item
  var v = json.filter(function(element){return (element['symbol']==symbol)})[0]
  return v[key]
}

function bitcoinchartsWeightedPrice(currency, timescale) {
  // given a currency symbol (ex: "USD") and timescape (ex: "7d", "30d")
  // return the value from the Bitcoincharts Weighted price data
  //
  // optional: to obtain the timestamp execute
  //    bitcoinchartsWeightedPrice("timestamp")
  var error = ""
 
  var json = fetchJSON('http://bitcoincharts.com/t/weighted_prices.json')
 
  //
  // Check that currency, timescale arguments are available in JSON data
  // return helpful error message if not
  //
  var currencies = Object.keys(json)
  
  if (currencies.indexOf(currency) == -1)
    error += "currency argument not one of: "+currencies.join(", ")+"\n"

  var timescales = Object.keys(json["USD"]) // assumes USD always exists
  // Deal with requests for timestamp
  if (currency != "timestamp" && timescales.indexOf(timescale) == -1)
    error += "timescale argument not one of: "+timescales.join(", ")  

  if (error != "")
    return error

  // Return requested item

  if (currency == "timestamp")
    return json[currency]
  else
    return json[currency][timescale]
}

