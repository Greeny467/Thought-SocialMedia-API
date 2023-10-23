const {User, Thought} = require('../models/index');


const userFindAll = async () => {
    try {
        const userData = await User.find({}).populate('thoughts friends');

        if(userData.length === 0){
            return 'none';
        }
        else{
            return userData;
        }
    } catch (error) {
       console.error(error);
       return 'error'; 
    };
};

const userFindOne = async (id) => {
    try{
        const userData = await User.findOne({_id: id}).populate('thoughts friends');

        if(!userData){
            return 'none';
        }
        else{
            return userData;
        }
    }
    catch (err) {
        console.error(err);
        return 'error';
    };
};

const userPost = async (body) => {
    try {
        const userData = await User.create(body);

        if(!userData){
            return 'none';
        }
        else{
            return userData;
        };
    } catch (error) {
      console.error(error);
      return 'error';
    };
};

const userPut = async (body, id) => {
    try {
        const userData = await User.findOneAndUpdate({_id: id}, {$set: body}, {runValidators: true, new: true});
        if(!userData){
            return 'none';
        }
        else{
            return userData;
        }
    } catch (error) {
        console.error(error);
        return 'error';
    };
};

const userDelete = async (id) => {
    try {
       const userData = await User.findOneAndDelete({_id: id});
       if(!userData){
        return 'none';
       } 
       else{
        return userData;
       }
    } catch (error) {
        console.error(error);
        return 'error';
    }
}

module.exports = {userFindAll, userFindOne, userPost, userPut, userDelete};