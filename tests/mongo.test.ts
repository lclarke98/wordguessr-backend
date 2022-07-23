const user = require("../user/user-db");


test('Add a new user', async() =>{
    return user.getUser('07798db5-6d7e-4304-b10c-5e0d6ee9755b').then(data =>{
        console.log('the data ', data)
        expect(data.length).toBeGreaterThan(20)
    })
})

