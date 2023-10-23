const {User, Thought, Reaction} = require('../models/index');

const friendPost = async (userId, id) => {
    try {
        const addFriend = await User.findByIdAndUpdate(userId, {
            $push: { friends : id }
        });

        if(!addFriend){
            return 'none';
        }
        else{
            return addFriend;
        }
    } catch (error) {
        console.error(error);
        return 'error';
    }
};

const friendDelete = async (userId, id) => {
    try {
        const removeFriend = await User.findByIdAndUpdate(userId, {
            $pull: { friends : id }
        });

        if(!removeFriend){
            return 'none';
        }
        else{
            return removeFriend;
        }
    } catch (error) {
        console.error(error);
        return 'error';
    }
};

const reactionPost = async (thoughtId, body) => {
    try {
       const addReaction = await Thought.findByIdAndUpdate(thoughtId, {
        $push: { reactions: body }
       });

       if(!addReaction){
        return 'none';
       }
       else{
        return addReaction;
       };
    } catch (error) {
        console.error(error);
        return 'error';
    };
};

const reactionDelete = async (thoughtId, reaction_Id) => {
    try {
       const removeReaction = await Thought.findByIdAndUpdate(thoughtId, {
        $pull: { reactions: {reactionId: reaction_Id} }
       });

       if(!removeReaction){
        return 'none';
       }
       else{
        return removeReaction;
       };
    } catch (error) {
        console.error(error);
        return 'error';
    };
};

module.exports = {friendPost, friendDelete, reactionPost, reactionDelete};