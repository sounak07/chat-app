const expect = require('expect');

const {
    isRealString
} = require('./validation');


describe('isRealString', () => {
    it('should reject non-string values', () => {
        var res = isRealString(98);
        expect(res).toBe(false);
    });

    it('should reject strings with spaces only', () => {
        var res = isRealString('  ');
        expect(res).toBe(false);
    });

    it('should allow string non-space characters', () => {
        var res = isRealString('f r');
        expect(res).toBe(true);
    });
});