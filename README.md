This bot uses TradingView Pivot Reversal Strategy and Binance API.  
Check the _.env file and the following before you start running it.  


How to use:  
You will need Tradingview Alerts to be sent from the Pivot Reversal Strategy via Webhooks. Costs like 15 bucks a month.  
The alert message needs to have following parameters:  
message: {{strategy.order.action}}  
Webhook URL: the URL where this application runs on your localhost (you need port forwarding like 5000 to 80 because tradingview needs port 80)  
  
set the Inputs of the Pivot Reversal Strategy before creating the alert:  
LeftBars: 2 (what I use for 1 min strategy)  
RightBars: 2 (what I use)  

When everything is set up, run npm install and npm start
