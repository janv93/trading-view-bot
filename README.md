This bot uses TradingView cm_ultimate_ma_mtf_v2 strategy and Binance API.  
Check the _.env file and the following before you start running it.  


# How to use:  
  
You will need Tradingview Alerts to be sent from the TradingView cm_ultimate_ma_mtf_v2 strategy via Webhooks. 
The strategy has no alerts built-in, so you will have to add the 2 lines at end of script:

```
alertcondition(ma_up, title = "Buy Condition", message = "BUY")
alertcondition(ma_down, title = "Sell Condition", message = "SELL")
```

Set the Options to "Once Per Bar Close".

Webhook URL: the URL where this application runs on your localhost (you need port forwarding like 5000 to 80), there are several tools to find out your IPv4 address.


  
Note: Use the "[Symbol] / ThetherUS PERPETUAL FUTURES BINANCE" chart, if you use the normal [Symbol]/USDT binance chart it will not work because futures chart looks very different.  
