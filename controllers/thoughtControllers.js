const {User, Thought} = require('../models/index');


const thoughtFindAll = async () => {
    try {
        const thoughtData = await Thought.find({}).populate('reactions');

        if(thoughtData.length === 0){
            return 'none';
        }
        else{
            return thoughtData;
        }
    } catch (error) {
       console.error(error);
       return 'error'; 
    };
};

const thoughtFindOne = async (id) => {
    try{
        const thoughtData = await Thought.findOne({_id: id}).populate('reactions');

        if(!thoughtData){
            return 'none';
        }
        else{
            return thoughtData;
        }
    }
    catch (err) {
        console.error(err);
        return 'error';
    };
};

const thoughtPost = async (body) => {
    try {
        const thoughtData = await Thought.create(body);

        if(!thoughtData){
            return 'none';
        }
        else{
            const addUserThought = await User.findOneAndUpdate({username: body.username}, {
                $push: {thoughts: thoughtData._id}
            });

            if(!addUserThought){
                return 'error';
            }
            else{
                return thoughtData;
            };

        };
    } catch (error) {
      console.error(error);
      return 'error';
    };
};

const thoughtPut = async (body, id) => {
    try {
        const thoughtData = await Thought.findOneAndUpdate({_id: id}, {$set: body}, {runValidators: true, new: true});
        if(!thoughtData){
            return 'none';
        }
        else{
            return thoughtData;
        }
    } catch (error) {
        console.error(error);
        return 'error';
    };
};

const thoughtDelete = async (id) => {
    try {
       const thoughtData = await Thought.findOneAndDelete({_id: id});
       if(!thoughtData){
        return 'none';
       } 
       else{
        const removeUserThought = await User.findOneAndUpdate({username: thoughtData.username}, {
            $pull: {thoughts: thoughtData._id}
        });

        if(!removeUserThought){
            return 'none';
        }
        else{
            return thoughtData;
        };

       };
    } catch (error) {
        console.error(error);
        return 'error';
    };
};

module.exports = {thoughtFindAll, thoughtFindOne, thoughtPost, thoughtPut, thoughtDelete};