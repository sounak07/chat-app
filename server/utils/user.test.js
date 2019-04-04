const expect = require("expect");


const {
    Users
} = require('./users');


describe('Users', () => {

    var users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Sounak',
            room: 'Pubg PC'
        }, {
            id: '2',
            name: 'Anu',
            room: 'Pubg'
        }, {
            id: '4',
            name: 'Dark',
            room: 'Pubg'
        }];
    });

    it('should add new user', () => {
        var users = new Users();
        var user = {
            id: '123',
            name: 'Galahad',
            room: 'PUBG'
        }
        var resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it('should remove a user', () => {
        var userId = '1';
        var user = users.removeUser(userId);

        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });

    it('should not remove a user', () => {
        var userId = '11';
        var user = users.removeUser(userId);

        expect(user).toBeFalsy();
        expect(users.users.length).toBe(3);
    });

    it('should find a user', () => {
        var userId = '1';
        var user = users.getUser(userId);

        expect(user.id).toBe(userId);

    });

    it('should not find a user', () => {
        var userId = '8';
        var user = users.getUser(userId);

        expect(user).toBeFalsy();
    });

    it('should return players of pubg', () => {
        var userList = users.getUserList('Pubg PC');

        expect(userList).toEqual(['Sounak'])
    });



});