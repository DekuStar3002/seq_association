const express = require('express');
const app = express();
app.use(express.json());
const db = require('./database/models');

const addDataToUserThenAddToProfile = async () => {
    try {
        const user = await db.User.create({username: 'username', password:'password'});
        const profile = await db.Profile.create({
            user_id: user.id,
            fullname: 'fullname',
            birthdate: Date.now(),
            gender: 'f',
            position: 'pos'
        });
        return profile;
    } catch (error) {
        console.log(error);
    }
}

const findAllUserAndProfile = async () => {
    try {
        const users = await db.User.findAll();
        // console.log(`Users: ${users}`);
        const profiles = await db.Profile.findAll({ include: ['User'] });
        return profiles;
    } catch (error) {
        console.log(error);
    }
}

const findProfileUsingUserId = async () => {
    try {
        const user = await db.User.findByPk(3, { include: ['profile'] })
        return user;
    } catch (error) {
        console.log(error);
    }
}

app.get('/add', async (req, res) => {
    const profile = await addDataToUserThenAddToProfile();
    res.json(profile);
});

app.get('/profile', async (req, res) => {
    const profile = await findAllUserAndProfile();
    res.json(profile);
});

app.get('/user', async (req, res) => {
    const user = await findProfileUsingUserId();
    // console.log(JSON.stringify(use))
    res.json(user);
})

app.listen(5050, () => {
    console.log('Server Started');
})