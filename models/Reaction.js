const { ObjectId } = require('bson');
const { Schema, model } = require('mongoose');
const {formatDate} = require('../utils/formatDate');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: ObjectId,
            default: function () {
                return new ObjectId();
            }
        },
        reactionBody: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false
    }
);

reactionSchema
.virtual('formattedDate')
.get(function () {
    return formatDate(this.createdAt);
});

const Reaction = model('Reaction', reactionSchema);

module.exports = Reaction;