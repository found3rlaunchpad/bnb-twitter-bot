import axios from 'axios'
const BASE_URL = process.env.REACT_APP_BASEURL



export const startBot = async()=>{

    var data = JSON.stringify({
        "interval": 34
      });
      
      var config = {
        method: 'post',
        url: `${BASE_URL}/start`,
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      var result = await axios(config)
      .then(function (response) {
        return (response.data);
      })
      .catch(function (error) {
        return (error.message);
      });
    return result  
}

export const stopBot = async()=>{

    
      
      var config = {
        method: 'delete',
        url: `${BASE_URL}/start`,
        headers: { 
          'Content-Type': 'application/json'
        }
      };
      
      var result = await axios(config)
      .then(function (response) {
        return (response.data);
      })
      .catch(function (error) {
        return (error.message);
      });
      return result  
}

export const getStatus = async()=>{
 
      
    var config = {
      method: 'get',
      url: `${BASE_URL}/status`,
      headers: { 
        'Content-Type': 'application/json'
      }
    };
    
    var result = await axios(config)
    .then(function (response) {
      return (response.data);
    })
    .catch(function (error) {
      return (error.message);
    });
    return result  
}