const tmi = require('tmi.js');
const key = require("./key")
var express = require("express");
var app = express();
app.get("/url", (req, res, next) => {
  res.json([aCounter, bCounter, cCounter, dCounter]);
});
app.listen(3000, () => {
  console.log("Server running on port 3000");
});

const opts = {
  identity: {
    username: "summarek_1",
    password: key
  },
  channels: [
    'summarek'
  ]
};

let aCounter = 0, bCounter = 0,cCounter = 0, dCounter = 0;
const voters = [];

const client = new tmi.client(opts);

client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

client.connect();

function onMessageHandler (target, user, msg, self) {
  if (self) { return; } // Ignore messages from the bot

  const commandName = msg.trim();
  let author = user['display-name'];

  if (!voters.includes(author)) {
    switch(commandName){      
      case "!vote a":
        aCounter++
        voters.push(author)      
        break;
      case "!vote b":
        bCounter++
        voters.push(author)
        break;
      case "!vote c":
        cCounter++
        voters.push(author)     
        break;
      case "!vote d":
        dCounter++ 
        voters.push(author)      
        break;
    }
  }

  console.log(voters);
  
  console.log(aCounter);
  console.log(bCounter);
  console.log(cCounter);
  console.log(dCounter);

}

function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}