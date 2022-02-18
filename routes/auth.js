const router = require('express').Router();
const User = require('../Db/models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


router.post('/register', async (req, res) => {

    const usernameExist = await User.findOne({username: req.body.username});
    if(usernameExist) {
        console.log('Username exists');
        return res.status(400).json({error: 'Username exists'});
    }

    const salt = await bcrypt.genSalt(10);
    const hashPssword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        username: req.body.username,
        password: hashPssword
    });

    try {
        const saveUser = await user.save();
        const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
        res.json({ user: user._id, redirect: 'Home'});
        console.log(token);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/login', async (req, res) => {
    
    const user = await User.findOne({username: req.body.username});
    if(!user){
        console.log('User is not found');
        return res.status(400).json({error: 'User is not found'});
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) {
        console.log('Invalid password');
        return res.status(400).json({error: 'Invalid password'});
    }
    
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).json({token: token, redirect: 'Home'});
    console.log(token);
});

module.exports = router;