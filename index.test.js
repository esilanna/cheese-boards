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

    //TESTING IF A USER CAN HAVE MANY BOARDS
    test ("testing 1-M User to Boards", async () => {
        await sequelize.sync({ force: true});
        let user1 = await User.create({
            name: "user 1",
            email: "user@gmail.com"})
        let board1 = await Board.create({
            type: "Budget Cheeses",
            description: "Don't break the bank for quality cheese",
            rating: 8})
        let board2 = await Board.create({
            type: "Fancy Cheeses",
            description: "Taste the luxury",
            rating: 10
        })
        await user1.addBoards([board1, board2]);
        const user1Boards = await user1.getBoards();
        expect(user1Boards.length).toBe(2);
        expect(user1Boards[0] instanceof Board).toBeTruthy;
    })

    //TESTING IF CHEESES CAN BE ON MANY BOARDS & IF MANY 
    //BOARDS CAN HAVE CHEESES
    test ("testing M-M Cheeses to Boards", async () => {
        await sequelize.sync({force: true});
        let board1 = await Board.create({
            type: "Board 1",
            description: "Board with Tier 1 Cheeses",
            rating: 8
        })
        let board2 = await Board.create({
            type: "Board 2",
            description: "Board with Tier 2 Cheeses",
            rating: 8.5
        })
        let cheese1 = await Cheese.create({
            title: "Cheese 1",
            description: "Cheese 1 pairs well with other tier 1 cheeses"
        })
        let cheese2 = await Cheese.create({
            title: "Cheese 2",
            description: "Cheese 2 pairs well with other tier 2 cheeses"
        })

        await board1.addCheese(cheese1);
        await board1.addCheese(cheese2);
        const board1Cheeses = await board1.getCheeses();
        expect(board1Cheeses.length).toBe(2);

        await board2.addCheese(cheese1)
        const cheese1Boards = await cheese1.getBoards();
        expect(cheese1Boards.length).toBe(2);
        const cheese2Boards = await cheese2.getBoards();
        expect (cheese2Boards.length).toBe(1);
    })

    
})