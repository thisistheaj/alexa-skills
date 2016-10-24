var http = require("http");

var options = {
  "method": "GET",
  "hostname": "alignapi.com",
  "port": "9000",
  "path": "/table/User",
  "headers": {
    "cache-control": "no-cache"
  }
};

exports.handler = function( event, context ) {

  var req = http.request(options, function (res) {
    var chunks = [];

    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", function () {
      var body = Buffer.concat(chunks);
      console.log(JSON.parse(body.toString()).length > 0);
      var t = "";
      if (JSON.parse(body.toString()).length > 0) {
        t = "The Align server is Running";
      } else {
        t = "Unfortunately, the Align server is Down";
      }
      var response = {
        outputSpeech: {
          type: "PlainText",
          text: t
        },
        shouldEndSession: true
      };
      context.succeed( { response: response } );
    });
  });

  req.end();


};



