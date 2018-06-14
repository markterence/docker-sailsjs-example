const  axios = require('axios');
var _ = require('lodash');
 
module.exports = {
	Post: (url, body, headers, axiosConf) =>{
		return new Promise((resolve, reject)=>{
			console.log(url,body)
				
			let config = {
				method: 'post',
				url: url,
				headers: headers,
				data: body
			}
  
				axios(config).then(res=>{
					return resolve(res.data)
				}).catch(error=>{
					if (error.response) {
						// The request was made and the server responded with a status code
						// that falls out of the range of 2xx
						console.log(error.response.data);
						console.log(error.response.status);
						console.log(error.response.headers);
						return reject( error.response.data)
					} else if (error.request) {
						// The request was made but no response was received
						// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
						// http.ClientRequest in node.js
						console.log(error.request);
						return reject( error.request)
					} else {
						// Something happened in setting up the request that triggered an Error
						console.log('Error', error.message);
						return reject( error.message)
					}
					
				});
		 
		})
	
	}
}