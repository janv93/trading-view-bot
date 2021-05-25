This bot uses TradingView Pivot Reversal Strategy and Binance API.  
Check the _.env file and the following before you start running it.  


# How to use:  
  
You will need Tradingview Alerts to be sent from the Pivot Reversal Strategy via Webhooks. Costs like 15$ a month.  
The alert message needs to have following parameters:  
message: {{strategy.order.action}}  
Webhook URL: the URL where this application runs on your localhost (you need port forwarding like 5000 to 80 because tradingview needs port 80)  
  

  
## Set the Inputs of the Pivot Reversal Strategy before creating the alert  
What I use currently use (probably suboptimal, still improving):  
symbol: MATIC  
timeframe: 15 min  
LeftBars: 2  
RightBars: 5  

Use the "[Symbol] / ThetherUS PERPETUAL FUTURES BINANCE" chart, if you use the normal [Symbol]/USDT binance chart it will not work because futures chart looks very different.  
