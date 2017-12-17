/* At the moment coinbase does not support grabbing the 
   order book. So only grabbing price is supported.
   Also they do not expose the lowest ask or buy but
   rather the lowest for a given quanity. This code
   defaults to the qty=1 BTC.
   
   Also they use a different language for ask and buy.
   We stick with ask and buy for keys. Hence, their...
   Buy = Ask (lowest ask)
   Sell = Bid (highest bid)
   */

//function coinbasetest() { Logger.log(coinbasePrice('ask')); Logger.log(coinbasePrice('bid')); }

function coinbasePrice(key) {
  if (key != 'ask' && key != 'bid')
    return 'key must = ask or bid' 

  if (key == 'ask')
    var json = fetchJSON('https://coinbase.com/api/v1/prices/buy?qty=1&currency=USD')
  else if (key == 'bid')
    var json = fetchJSON('https://coinbase.com/api/v1/prices/sell?qty=1&currency=USD')

  if (json == 'err')
    return 'err'
    
  return parseFloat(json['amount'])

}

