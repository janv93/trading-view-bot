This bot uses TradingView Pivot Reversal Strategy and Binance API.  
Check the _.env file and the following before you start running it.  


How to use:  
You will need Tradingview Alerts to be sent from the Pivot Reversal Strategy via Webhooks. Costs like 15 bucks a month.  
The alert message needs to have following parameters:  
message: {{strategy.order.action}}  
Webhook URL: the URL where this application runs on your localhost (you need port forwarding like 5000 to 80 because tradingview needs port 80)  
  
set the Inputs of the Pivot Reversal Strategy before creating the alert:  
  
What I use currently use (probably suboptimal, still improving):  
  
timeframe: 15min  
LeftBars: 3  
RightBars: 0  

For Bitcoin use the "Bitcoin / ThetherUS PERPETUAL FUTURES BINANCE" chart, if you use the normal BTC/USDT binance chart it will not work because futures chart looks very different.  


Issues with this bot:  
- While the bot itself is profitable, binance charges a fee and takes a huge chunk of the trade. You need at least 0.04% per average trade profit, or it will make loss.
- If you use a small timeframe like 1 minute, the time from receiving the signal from TradingView to the position getting opened on Binance will take too much time so that you open the actual position at a different value than what the Pivot strategy had in mind. Especially when you go sideways it will make heavy losses.  
  
Solution:  
Use a larger timeframe like 15min or higher so that processing time will be irrelevant. LeftBars/RightBars inputs will have to be adjusted for every timeframe.
