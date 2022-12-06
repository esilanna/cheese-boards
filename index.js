const {User} = require('./User')
const {Board} = require('./Board')
const {Cheese} = require ('./Cheese')

Board.belongsTo(User)
User.hasMany(Board)

module.exports = { 
    User, 
    Board, 
    Cheese
};