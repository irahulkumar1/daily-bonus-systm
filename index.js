'use strict'
const user = require("./configure.js");
console.log(user);
var request = require("request");
var options = { method: 'POST',
	url: 'https://'+user.host+'/auth/login',
	headers: 
	{ 'postman-token': 'c96107ac-bb07-0d07-7562-99f7fc0a5bd2',
		'cache-control': 'no-cache',
		'content-type': 'application/x-www-form-urlencoded' },
	form: 
	{ email: user.email,
		passwd: user.passwd,
		code: user.code } };
var checkin = function(cookie){
	var options = { method: 'POST',
		url: 'https://'+host+'/user/checkin',
		headers: 
		{ 'postman-token': '579bddac-1fab-8d85-cce2-65de127232a5',
			'cache-control': 'no-cache',
			cookie:cookie,
			'content-type': 'application/x-www-form-urlencoded' } };
	request(options, function (error, response, body) {
		if (error) throw new Error(error);
		let obj = JSON.parse(body);
		console.log(unescape(obj.msg));
	});
}
var main=()=>{request(options, function (error, response, body) {
	console.log(new Date());
	if (error) throw new Error(error);
	let obj = JSON.parse(body);
	let msg=unescape(obj.msg);
	console.log(msg);
	if(msg!='欢迎回来'){
		console.error("login error ");
		process.exit(1);
	}
	let arr = (response.headers['set-cookie']);
	let str = '';
	for(let i =0;i<arr.length;i++){
		if(i!==0)str+=(';');
		str+=(arr[i].split(';')[0]);
	}
	checkin(str);
});
}
main();
setInterval(main,12*60*60*1000);