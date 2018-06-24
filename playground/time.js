var moment = require('moment');
//
// var  date = new Date();
// console.log(date.getMonth());
//
// var date = moment();
// date.add(1, "year").subtract(2, "month");
// console.log(date.format('MMM Do, YYYY'));
//
//
// console.log(date.format('hh:MM a'));

var createdAt = 1234;
var date = moment(createdAt);
console.log(date.format('hh:MM a'));
