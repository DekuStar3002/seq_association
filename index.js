const express = require('express');
const axios = require('axios');
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
        const todo1 = await db.Todo.create({ user_id: user.id, fullname: 'todo1' });
        const todo2 = await db.Todo.create({ user_id: user.id, fullname: 'todo2' });
        const todo3 = await db.Todo.create({ user_id: user.id, fullname: 'todo3' });
        const todo4 = await db.Todo.create({ user_id: user.id, fullname: 'todo4' });
        return profile;
    } catch (error) {
        console.log(error);
    }
}

const findAllUserAndProfile = async () => {
    try {
        // const users = await db.User.findAll();
        // console.log(`Users: ${users}`);
        const profiles = await db.Profile.findAll({ include: ['User'] });
        return profiles;
    } catch (error) {
        console.log(error);
    }
}

const findProfileUsingUserId = async () => {
    try {
        const user = await db.User.findByPk(6, { include: ['profile', 'Todos'] })
        return user;
    } catch (error) {
        console.log(error);
    }
}

const getTodoData = async () => {
    try {
        const post = await axios.get("https://jsonplaceholder.typicode.com/posts/1");
        console.log(post.data);
        const todo = await db.Todo.findOne({ where: { fullname: 'todo1', user_id: 6 }, include: ['User'] });
        return todo;
    } catch (error) {
        console.log(error);
    }
}

app.get('/add/profile/todo', async (req, res) => {
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

app.get('/usertodo', async (req, res) => {
    const todo = await getTodoData();
    res.json(todo);
})

app.listen(5050, () => {
    console.log('Server Started');
})