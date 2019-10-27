const tmi = require('tmi.js');
const key = require('./key');
var express = require('express');
var app = express();

app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization',
	);
	next();
});
var ipTab = []
app.get('/url', (req, res, next) => {
	res.json([ aCounter, bCounter, cCounter, dCounter ]);

	var ip1 = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  var ip2 = req.headers['x-real-ip'] || req.connection.remoteAddress;

  if(!ipTab.includes(ip1)){
    ipTab.push(ip1);
    console.log("IP: ---------------------");
    console.log(ipTab.join(" "))

  }
  if(!ipTab.includes(ip2)){
    ipTab.push(ip2);
    console.log("IP: ---------------------");
    console.log(ipTab.join(" "))
  }
});
app.get('/voters', (req, res, next) => {
	res.json(voters.join(' '));
});
app.listen(3000, () => {
	console.log('Server running on port 3000');
});

app.set('trust proxy', true);

const opts = {
	identity: {
		username: 'summarek_1',
		password: key,
	},
	channels: [ 'summarek' ],
};

let aCounter = 0,
	bCounter = 0,
	cCounter = 0,
	dCounter = 0;
const voters = [];

const client = new tmi.client(opts);

client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

client.connect();

function onMessageHandler(target, user, msg, self) {
	if (self) {
		return;
	} // Ignore messages from the bot

	const commandName = msg.trim();
	let author = user['display-name'];

	// if (!voters.includes(author)) {
	switch (commandName) {
		case '!vote a':
			aCounter++;
			voters.push(author);
			break;
		case '!vote b':
			bCounter++;
			voters.push(author);
			break;
		case '!vote c':
			cCounter++;
			voters.push(author);
			break;
		case '!vote d':
			dCounter++;
			voters.push(author);
			break;
	}
	// }

	console.log(voters);

	console.log(aCounter);
	console.log(bCounter);
	console.log(cCounter);
	console.log(dCounter);
}

function onConnectedHandler(addr, port) {
	console.log(`* Connected to ${addr}:${port}`);
}
