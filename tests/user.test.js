//07798db5-6d7e-4304-b10c-5e0d6ee9755b

const user = require('../user/user-db')

test('Number of guesses should be 12', () => {
    return user.getUser('07798db5-6d7e-4304-b10c-5e0d6ee9755b').then(data => {
        expect(data).toEqual([{"user_id": 5}]);
    });
});