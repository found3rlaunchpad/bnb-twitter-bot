const {getBnbPrice} = require('./CoinGecko')
const { createImage } = require('./ImageCreator')
const { tweet } = require('./tweet')
const CronJob = require("cron").CronJob;
var prevBNBPrice = 0
var prevUpdatedDate = new Date()

// runType : initial , 10perc, opening
const run = async (runType)=>{
    let response = await getBnbPrice()
    let price = response.binancecoin.usd
    console.log(price)
    if(price !== 0){
    if(runType==='initial'){
        prevBNBPrice = price
        prevUpdatedDate = new Date()
        await createImage(price,"neutral")
        await tweet("Current BNB Price")
    } else if(runType==='10perc'){
        let priceDiff = price - prevBNBPrice
        let perc = Math.abs(priceDiff/prevBNBPrice)*100
        if(perc>=10){
        let side = "neutral"
        let tweet = "BNB Price"
        if(priceDiff>0){
            side='up'
            tweet = `BNB Up 10% since ${prevUpdatedDate}`
        }else if(priceDiff<0){
            side = 'down'
            tweet = `BNB Down 10% since ${prevUpdatedDate}`
        }
            await createImage(price,side)
            await tweet(tweet)

        }

        prevBNBPrice = price
        prevUpdatedDate = new Date()

    }else if(runType==='opening'){
        let currentDate = new Date()
        await createImage(price,'neutral')
        await tweet(`BNB Opening Price on ${currentDate}`)
    }
}else {
    console.log("Error Getting Prices")
}
    
 
}



const openingCandleTweet = new CronJob("0 0 * * *", async () => {
    run("opening");
    console.log("Runing Opening Price Check")
  },
  null,
  false, //Start Now...?
  'UTC' // TimeZone
  );

openingCandleTweet.start()

run("initial")
setInterval(() => {
    run("10perc")
}, 1*60*60*1000);



