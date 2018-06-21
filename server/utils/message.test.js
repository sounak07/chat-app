var expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage',() => {
  it('should generate correct message object',()=>{
    var from = 'Jen';
    var text = 'Some message';
    var message = generateMessage(from, text);

    expect(typeof message.createdAt).toBe('number');   //replaced with toBeA number in jest
    expect(message).toMatchObject({from, text});      //replaced with toInclude in jest

  });
});
