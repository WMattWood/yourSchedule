const https = require('https');


const msgServerViaWebHook = (msg) => {

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

  let req = https.request(options, (res) => {
    console.log('statusCode:', res.statusCode);
    console.log('headers:', res.headers);
    
    res.on('data', (d) => {
        process.stdout.write(d);
      });
    });
    
    req.on('error', (e) => {
      console.error(e);
    });
    
    req.write(postData);
    req.end();

}

// msgServerViaWebHook("Howdy Fella")

module.exports = {
  msgServerViaWebHook
}