const {sequelize} = require('./db');
const { User, Board, Cheese } = require('./index');

describe("User, Board, and Cheese Models", () => {
    
    beforeAll( async () => {
        await sequelize.sync({force: true});
    })
    
    // TESTING CREATE FOR ALL MODELS
    test ("testing Creating a User", async () => {
        const user1 = await User.create({
            name: "test user",
            email: "testuser123.gmail.com"})
    expect(user1).toBeDefined();
    expect(user1.name).toBe("test user");
    })

    test ("testing Creating a Board", async () => {
        const board1 = await Board.create({
            type: "World Cheeses",
            description: "Cheeses from around the world",
            rating: 7.5 })
    expect(board1).toBeDefined();
    expect(board1.type).toBe("World Cheeses");
    })

    test ("testing Creating a Cheese", async () => {
        const cheese1 = await Cheese.create({
            title: "Old Amsterdam",
            description: "Aged Gruyere, pairs well with everything!"
        })
    expect(cheese1).toBeDefined();
    expect(cheese1.title).toBe("Old Amsterdam");
    })
})