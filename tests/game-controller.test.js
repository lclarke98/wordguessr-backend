const gameController = require('../game/gameController')
const db = require('../game/game-db')

test('Number of guesses should be 16', () => {
    return gameController.calculateGuessCount('HelloWorld', 'normal').then(data => {
        expect(data).toBe(16);
    });
});

test('Number of guesses should be 12', () => {
    return gameController.calculateGuessCount('testing', 'normal').then(data => {
        expect(data).toBe(12);
    });
});

test('Number of guesses should be 8', () => {
    return gameController.calculateGuessCount('test', 'normal').then(data => {
        expect(data).toBe(8);
    });
});


test('This game should be complete',  async() => {
    let game = await db.getGame(86, '07798db5-6d7e-4304-b10c-5e0d6ee9755b')
    let arr = await gameController.toJSON(game)
    game.push(arr)

    return gameController.isGameComplete(arr, game[0].word).then(data => {
        expect(data).toBe(true);
    });
});

test('Get all games for a user', async() =>{
    return db.getAllGames('07798db5-6d7e-4304-b10c-5e0d6ee9755b').then(data =>{
        console.log(data.length)
        expect(data.length).toBeGreaterThan(20)
    })
})

