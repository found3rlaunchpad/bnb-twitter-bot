const express = require('express')
const cors = require("cors");
const path = require('path');
const router = express.Router();
const bodyParser = require("body-parser");
const {getBnbPrice} = require('./server/CoinGecko')
const { createImage } = require('./server/ImageCreator')
const { tweet } = require('./server/tweet')
const PORT = process.env.port || 3001 ;
const CronJob = require("cron").CronJob;
var prevBNBPrice = 0
var prevUpdatedDate = new Date()
var percToCheck =10
var intervalCheck = 1*60*60*1000 //1hour default
var isBotRunning = false
var intervalId = 0

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use("/", router);



app.listen(PORT, ()=>{
    console.log(`Server Listening to Port ${PORT}`)
});

app.use(express.static(path.resolve(__dirname,'../client/build')));

router.get('/status',(request,response) => {
    //code to perform particular action.
    //To access POST variable use req.body()methods.
    
    response.json({data:{isbotRunning : isBotRunning}});
    });

    router.post('/start',(request,response) => {
        //code to perform particular action.
        //To access POST variable use req.body()methods.
        
        console.log("Start Bot")
        console.log(JSON.parse(JSON.stringify(request.body)));
        let config = JSON.parse(JSON.stringify(request.body))
        
            openingCandleTweet.start()
            percToCheck=config.percToCheck!==0?config.percToCheck:percToCheck
            if(config.prevUpdatedDate!==0){
                prevUpdatedDate= new Date(config.prevUpdatedDate)
            }
            if(config.prevPrice!==0){
                prevBNBPrice=config.prevPrice
            }
            if(config.intervalCheck!==0){
                intervalCheck=config.intervalCheck
            }
            startBot("initial",config.prevPrice!==0?true:false)

            intervalId = setInterval(() => {
                startBot("10perc")
            }, 
            // 5000    
            intervalCheck

            );

        isBotRunning =true    
        response.json({data:'success'});
        });
    router.delete('/start',(request,response) => {
        //code to perform particular action.
        openingCandleTweet.stop()
        clearInterval(intervalId)
        isBotRunning =false
        console.log("Stop Bot")
        response.json({data:'success'});
        });

// runType : initial , 10perc, opening
const startBot = async (runType,initialPriceGiven=false)=>{
    let response = await getBnbPrice()
    let price = response.binancecoin.usd
    console.log(price)
    if(price !== 0){
    if(runType==='initial'){
        if(initialPriceGiven===false){
            prevBNBPrice = price
        }
        prevUpdatedDate = new Date()
        await createImage(price,"neutral")
        await tweet("Current BNB Price")
    } else if(runType==='10perc'){
        let priceDiff = price - prevBNBPrice
        let perc = Math.abs(priceDiff/prevBNBPrice)*100
        if(perc>=percToCheck){
        let side = "neutral"
        let tweetMessage = "BNB Price"
        if(priceDiff>0){
            side='up'
            tweetMessage = `BNB Up ${percToCheck}% since ${prevUpdatedDate.toString().slice(0,33)}`
        }else if(priceDiff<0){
            side = 'down'
            tweetMessage = `BNB Down ${percToCheck}% since ${prevUpdatedDate.toString().slice(0,33)}`
        }
            await createImage(price,side)
            await tweet(tweetMessage)

        prevBNBPrice = price
        prevUpdatedDate = new Date()

        }

        

    }else if(runType==='opening'){
        let currentDate = new Date()
        await createImage(price,'neutral')
        await tweet(`BNB Opening Price on ${currentDate.toString().slice(0,33)}`)
    }
}else {
    console.log("Error Getting Prices")
}
    
 
}



const openingCandleTweet = new CronJob("0 0 * * *", async () => {
    startBot("opening");
    console.log("Runing Opening Price Check")
  },
  null,
  false, //Start Now...?
  'UTC' // TimeZone
  );





