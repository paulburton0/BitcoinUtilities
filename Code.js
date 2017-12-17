function usage() {

  return "INDEX: \n\
1. Using code in your code \n\
2. Using code in spreadsheet \n\
3. Function list \n\
 \n\
Using code in your code \n\
======================= \n\
\n\
a. In the script editor, go to Resources / Manage Libraries \n\
b. Search for 'Bitcoin Utilities' or add using the project token: \n\
     Mn6asBLgiBkIwY9lK-po6dDe4GsftYgT- \n\
c. Call functions from the default context of: \n\
     BitcoinUtilities.&lt;function&gt; \n\
   Example: \n\
     BitcoinUtilities.bitcoinchartsWeightedPrice('GBP', '24h') \n\
 \n\
Using code in spreadsheet \n\
========================= \n\
This will be very easy once Google accepts this library in the public \n\
scripts gallery. Once that is available you can use the code directly \n\
in spreadsheet forumulas without much fiddling with scripts: \n\
 \n\
a. From spreadsheet go to Tools / Scripts Gallery \n\
b. Search for 'Bitcoin Utilities' and install \n\
c. Call functions as you would a formula. For example, in a cell: \n\
     =bitcoinchartsWeightedPrice('GBP', '24h') \n\
 \n\
However at the time of writing Google has not yet added the library to  \n\
the public scripts gallery so instead you will have to create a new \n\
script for your spreadsheet and use the functions as in the 'Using code \n\
in your code' section. If you want to call the functions from within  \n\
spreadsheet forumulas as show in the example above, add the following  \n\
wrapper functions to the spreadsheet code: \n\
 \n\
function bitcoinchartsMarketPrice(symbol, key) { return BitcoinUtilities.bitcoinchartsMarketPrice(symbol, key) } \n\
function bitcoinchartsWeightedPrice(currency, timescale) { return BitcoinUtilities.bitcoinchartsWeightedPrice(currency, timescale) } \n\
function mtgoxPrice(currency, key) { return BitcoinUtilities.mtgoxPrice(currency, key) } \n\
function bitcoincentralPrice(currency, key) { return BitcoinUtilities.bitcoincentralPrice(currency, key) } \n\
function bitcoin24Price(currency, key) { return BitcoinUtilities.bitcoin24Price(currency, key) } \n\
function btcePrice(currency, key) { return BitcoinUtilities.btcePrice(currency, key) } \n\
function bitstampPrice(key) { return BitcoinUtilities.bitstampPrice(key) } \n\
function coinbasePrice(key) { return BitcoinUtilities.coinbasePrice(key) } \n\
function localbitcoinsPrice(country, cityorzip, distancekm, currency, key) { return BitcoinUtilities.localbitcoinsPrice(country, cityorzip, distancekm, currency, key) } \n\
function mtgoxOrderbook(currency, key) { return BitcoinUtilities.mtgoxOrderbook(currency, key) } \n\
function bitcoincentralOrderbook(currency, key) { return BitcoinUtilities.bitcoincentralOrderbook(currency, key) } \n\
function bitcoin24Orderbook(currency, key) { return BitcoinUtilities.bitcoin24Orderbook(currency, key) } \n\
function btceOrderbook(currency, key) { return BitcoinUtilities.btceOrderbook(currency, key) } \n\
function bitstampOrderbook(key) { return BitcoinUtilities.bitstampOrderbook(key) } \n\
function satoshidiceBetCount() { return BitcoinUtilities.satoshidiceBetCount() } \n\
function satoshidiceCoinsWon() { return BitcoinUtilities.satoshidiceCoinsWon() } \n\
 \n\
Optionally you could also review the public Bitcoin Utilities Examples spreadsheet \n\
that already has this wrapper code included and shows example use: \n\
  https://docs.google.com/spreadsheet/ccc?key=0AguYZ5-dWMgfdEhhWkNrR2pnMmhzMWcyb1FSbzZPSmc&usp=sharing \n\
\n\
Function list \n\
============= \n\
 \n\
Lowest ask or highest bid values: \n\
 \n\
 =bitcoinchartsMarketPrice(\"mtgoxAUD\",\"ask\") \n\
 =bitcoinchartsMarketPrice(\"bitstampUSD\",\"bid\") \n\
 =bitcoinchartsWeightedPrice(\"GBP\", \"24h\") \n\
 =bitcoinchartsWeightedPrice(\"EUR\", \"7d\") \n\
 =mtgoxPrice(\"USD\", \"ask\") <- lowest ask\n\
 =bitcoincentralPrice(\"EUR\", \"bid\") <- highest bid\n\
 =bitcoin24Price(\"EUR\", \"ask\") \n\
 =btcePrice(\"USD\", \"ask\") \n\
 =bitstampPrice(\"ask\") <- no currency option\n\
 =coinbasePrice(\"bid\") <- no currency option\n\
 =localbitcoinsPrice(\"DE\", \"Berlin\", \"100\", \"EUR\", \"bid\") <- 100=distance in km\n\
\n\
Returning full orderbooks: \n\
 \n\
 =mtgoxOrderbook(\"USD\", \"asks\") <- note: 'asks' not 'ask'\n\
 =bitcoincentralOrderbook(\"EUR\", \"bids\")\n\
 =bitcoin24Orderbook(\"EUR\", \"asks\")\n\
 =btceOrderbook(\"USD\", \"bids\")\n\
 =bitstampOrderbook(\"asks\") <- no currency option\n\
\n\
Will expand with additional functionalty. Currently includes grabbing \n\
Satishidice bid and btc bet count: \n\
 \n\
 =satoshidiceBetCount() \n\
 =satoshidiceCoinsWon()"
}
function doGet() {
  return HtmlService.createHtmlOutput("<pre>"+usage()+"</pre>");
}
function fetchJSON (url) {
  var json = UrlFetchApp.fetch(url,{muteHttpExceptions: true })
  if ('undefined' == typeof(json))
    return 'Error retrieving JSON data'
  
  if (json.getResponseCode() != 200)
    return 'err'
    
  json = json.getContentText()
  if (json.length<=0)
    return 'JSON data was invalid'

  json = Utilities.jsonParse(json)
  if ('undefined' == typeof(json))
    return 'Quote data was malformed JSON data'

  return json
}

function fetchXML (url) {
  var x = UrlFetchApp.fetch(url)
  if ('undefined' == typeof(x))
    return 'Error retrieving XML data'

  if (x.getResponseCode() != 200)
    return "err"
    
  x = x.getContentText()
  if (x.length<=0)
    return 'XML data was invalid'

  x = Xml.parse(x)
  if ('undefined' == typeof(x))
    return 'Quote data was malformed XML data'

  return x
}


