const router = require('express').Router();
const { ObjectId } = require('bson');

const {friendPost, friendDelete, reactionPost, reactionDelete} = require('../../controllers/friend-reactionController');
const {userFindAll, userFindOne, userPost, userPut, userDelete} = require('../../controllers/userControllers');
const {thoughtFindAll, thoughtFindOne, thoughtPost, thoughtPut, thoughtDelete} = require('../../controllers/thoughtControllers');


// USERS

// get all users route
router.get('/users', async (req, res) => {
    const results =  await userFindAll();
    console.log(results)

    if(results === 'error'){
        res.status(500);
    }
    else if (results === 'none'){
        res.status(404);
    }
    else{
        res.status(200).json(results);
    };
});

// get one user by id route
router.get('/users/:userId', async (req, res) => {
    const results = await userFindOne(req.params.userId);

    if(results === 'error'){
        res.status(500);
    }
    else if (results === 'none'){
        res.status(404);
    }
    else{
        res.status(200).json(results);
    };
});

// Post a new user route
router.post('/users', async (req, res) => {
    const {username, email} = req.body;

    const results = await userPost(req.body);

    if(results === 'error'){
        res.status(500);
    }
    else if (results === 'none'){
        res.status(404);
    }
    else{
        res.status(200).json(results);
    };
});


// Put user route by id
router.put('/users/:id', async (req, res) => {
    const {username, email} = req.body;

    const results = await userPut(req.body, req.params.id);

    if(results === 'error'){
        res.status(500);
    }
    else if (results === 'none'){
        res.status(404);
    }
    else{
        res.status(200).json(results);
    };
});

// Delete user route by id
router.delete('/users/:id', async (req, res) => {
    const results = await userDelete(req.params.id);

    if(results === 'error'){
        res.status(500);
    }
    else if (results === 'none'){
        res.status(404);
    }
    else{
        res.status(200).json(results);
    };
});

// USERS/:userId/friends/:friendId

// post route to add friend to user friend list.
router.post('/users/:userId/friends/:friendId', async (req, res) => {
    const results = await friendPost(req.params.userId, req.params.friendId);

    if(results === 'error'){
        res.status(500);
    }
    else if (results === 'none'){
        res.status(404);
    }
    else{
        res.status(200).json(results);
    };
});

// delete route to remove friend from user friend list.
router.delete('/users/:userId/friends/:friendId', async (req, res) => {
    const results = await friendDelete(req.params.userId, req.params.friendId);

    if(results === 'error'){
        res.status(500);
    }
    else if (results === 'none'){
        res.status(404);
    }
    else{
        res.status(200).json(results);
    };
});

// THOUGHTS

// get all thouts route
router.get('/thoughts', async (req, res) => {
    const results = await thoughtFindAll();

    if(results === 'error'){
        res.status(500);
    }
    else if (results === 'none'){
        res.status(404);
    }
    else{
        res.status(200).json(results);
    };
});

// get thought by _id route
router.get('/thoughts/:id', async (req, res) => {
    const results = await thoughtFindOne(req.params.id);

    if(results === 'error'){
        res.status(500);
    }
    else if (results === 'none'){
        res.status(404);
    }
    else{
        res.status(200).json(results);
    };
});

// Post thought route
router.post('/thoughts', async (req, res) => {
    
    const {thoughtText, username} = req.body;

    const results = await thoughtPost(req.body);

    if(results === 'error'){
        res.status(500);
    }
    else if (results === 'none'){
        res.status(404);
    }
    else{
        res.status(200).json(results);
    };
});

// Put route by _id
router.put('/thoughts/:id', async (req, res) => {
    
    const {thoughtText, username} = req.body;

    const results = await thoughtPut(req.body, req.params.id);

    if(results === 'error'){
        res.status(500);
    }
    else if (results === 'none'){
        res.status(404);
    }
    else{
        res.status(200).json(results);
    };
});

// Delete route by _id
router.delete('/thoughts/:id', async (req, res) => {

    const results = await thoughtDelete(req.params.id);

    if(results === 'error'){
        res.status(500);
    }
    else if (results === 'none'){
        res.status(404);
    }
    else{
        res.status(200).json(results);
    };
});

// THOUGHTS/:thoughtId/reactions/:reactionId

// post route 
router.post('/thoughts/:id/reactions', async (req, res) => {
    const {reactionBody, username} = req.body;

    const results = await reactionPost(req.params.id, 
        { 
            reactionBody: reactionBody,
            username: username
        }
    ); 

    if(results === 'error'){
        res.status(500);
    }
    else if (results === 'none'){
        res.status(404);
    }
    else{
        res.status(200).json(results);
    };
});

// delete by reactionId route
router.delete('/thoughts/:id/reactions/:reactionId', async (req, res) => {

    const results = await reactionDelete(req.params.id, req.params.reactionId);

    if(results === 'error'){
        res.status(500);
    }
    else if (results === 'none'){
        res.status(404);
    }
    else{
        res.status(200).json(results);
    };
});

module.exports = router;