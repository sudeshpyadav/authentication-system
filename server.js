const express = require('express');
const bcrypt = require('bcrypt');
const app = express();
app.use(express.json());
const users = [];

app.get('/users', (req, res) => {
    res.json(users);
});

app.post('/users', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        users.push({name:req.body.name, password: hashedPassword});
        res.status(201).send()
    } catch (e) {
        res.status(500).send()
    }
});

app.post('/users/login', async (req, res) => {
    const user = users.find((user) => user.name === req.body.name);
    if(user == null){
        return res.status(400).send("This user is not registered");
    }
    try {
        if(await bcrypt.compare(req.body.password, user.password)){
            return res.status(200).send("Success");
        }
        return res.status(400).send("Invalid username/password")
    } catch (e) {
        return res.status(500).send()
    }

});
app.listen(3000);

module.exports = app;