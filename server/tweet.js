require("dotenv").config();
const { twitterClient } = require("./twitterClient.js")

exports.tweet = async (tweetMessage) => {
  try {
    // await twitterClient.v2.tweet("Hello world!");
    const mediaId = await twitterClient.v1.uploadMedia('./resources/drawnImage.png');
    const newTweet = await twitterClient.v1.tweet(tweetMessage, { media_ids: mediaId });
    console.log(tweetMessage)
  } catch (e) {
    console.log(e)
  }
}

// tweet();