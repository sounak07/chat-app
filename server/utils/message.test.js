var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage',() => {
  it('should generate correct message object',()=>{
    var from = 'Jen';
    var text = 'Some message';
    var message = generateMessage(from, text);

    expect(typeof message.createdAt).toBe('number');   //replaced with toBeA number in jest
    expect(message).toMatchObject({from, text});      //replaced with toInclude in jest

  });
});


describe('generateLocationMessage',() => {
  it('should generate correct location',() => {
    var from =  'Admin';
    var lat =  1;
    var lng = 1;
    var url = 'https://www.google.com/maps?q=1,1';
    var location = generateLocationMessage(from, lat, lng);

    expect(typeof location.createdAt).toBe('number');
    expect(location).toMatchObject({from, url});
  });
});
