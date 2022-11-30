const https = require('https');

const msgServerViaWebHook = (req, res) => {

  let eventId = req.params.eventId
  let msg = req.body.content

  let postData = JSON.stringify({
    'content' : `${msg}`
  });

  let options = {
    hostname: "discord.com",
    port: 443,
    path: '/api/webhooks/1047304219876675684/AxTCEvuiwHJ4BfPkD47N7mjZewuDMX6LUhEbY3kR-7mDbyqWv5g_dVu6x60gjIMaqLMT',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  let diyHttpRequest = https.request(options, (diyHttpResponse) => {
    console.log('statusCode:', diyHttpResponse.statusCode);
    console.log('headers:', diyHttpResponse.headers);
    
    diyHttpResponse.on('data', (d) => {
        process.stdout.write(d);
      });
    });
    
    diyHttpRequest.on('error', (e) => {
      console.error(e);
    });
    
    diyHttpRequest.write(postData);
    diyHttpRequest.end();

    res.status(200).json({
      status: 200,
      message: "We have made contact",
      data: `${msg}`
    })
}

const httpPostViaWebHook = (req, res) => {

  let eventId = req.params.eventId

  let postData = JSON.stringify({
    'content' : `Hello stranger, you are invited to ${eventId}`
  });

  let options = {
    hostname: "discord.com",
    port: 443,
    path: '/api/webhooks/1047304219876675684/AxTCEvuiwHJ4BfPkD47N7mjZewuDMX6LUhEbY3kR-7mDbyqWv5g_dVu6x60gjIMaqLMT',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  let diyHttpRequest = https.request(options, (diyHttpResponse) => {
    console.log('statusCode:', diyHttpResponse.statusCode);
    console.log('headers:', diyHttpResponse.headers);
    
    diyHttpResponse.on('data', (d) => {
        process.stdout.write(d);
      });
    });
    
    diyHttpRequest.on('error', (e) => {
      console.error(e);
    });
    
    diyHttpRequest.write(postData);
    diyHttpRequest.end();

}


// msgServerViaWebHook("Howdy Fella")

module.exports = {
  msgServerViaWebHook,
  httpPostViaWebHook
}