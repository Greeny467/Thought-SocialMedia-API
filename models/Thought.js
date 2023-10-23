const { ObjectId } = require('bson');
const {Schema, model} = require('mongoose');
const Reaction = require('./Reaction');
const {formatDate} = require('../utils/formatDate');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [Reaction.schema]
        
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false,
    }
)

thoughtSchema
    .virtual('reactionCount')
    .get(function () {
        this.createdAt
        return this.reactions.length;
    })
thoughtSchema
    .virtual('formattedDate')
    .get(function () {
        return formatDate(this.createdAt)
    });

const Thought = model('Thought', thoughtSchema);

module.exports = Thought