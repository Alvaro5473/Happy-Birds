const userModel = require('../models/userModel')

exports.index = (req, res) => {
    const users = userModel.getAllUsers();
    res.render('users/index', { users });
};

exports.login = (req, res) => {
    res.render('users/login', { layout: false });
};

exports.logUser = (req, res) => {
    const name = req.body.name;
    const password = req.body.password;
    const user = userModel.findUserByName(name);
    if (!user || password !== user.password) {
        res.redirect('/login');
        return;
    }
    userModel.userOnline(name, true);
    res.redirect('/game');
}

exports.create = (req, res) => {
    res.render('users/register', { layout: false });
};

exports.store = (req, res) => {
    const users = userModel.getAllUsers();
    const newUser = {
        id: users.length + 1,
        name: req.body.name,
        password: req.body.password,
        isOnline: false
    };
    users.push(newUser);
    userModel.saveUsers(users);
    res.redirect('/login');
};