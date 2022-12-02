
exports.getBnbPrice = async () =>{
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  var result = fetch("https://api.coingecko.com/api/v3/simple/price?vs_currencies=usd&ids=binancecoin", requestOptions)
    .then(response => response.text())
    .then(result => {return JSON.parse(result)})
    .catch(error => {
                console.log('error', error);
                return {binancecoin:{usd:0}}});
      
return result 
}
