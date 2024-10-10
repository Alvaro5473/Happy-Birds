const userModel = require('../models/userModel');

exports.index = (req, res) => {
    const users = userModel.getAllUsers();
    res.render('users/index', { users });
};

exports.login = (req, res) => {
    res.render('users/login');
};

exports.logUser = (req, res) => {
    const { name, password } = req.body;
    const user = userModel.findUserByName(name);
    if (!user || password !== user.password) {
        res.redirect('/login');
        return;
    }
    userModel.userOnline(name, true);
    req.session.username = name;
    res.redirect('/game');
}

exports.logout = (req, res) => {
    const name = req.session.username;
    userModel.userOnline(name, false);
    req.session.destroy((err) => {
        if (err) {
            return res.send('Error al cerrar la sesión');
        }
        res.redirect('/login');
    });
}

exports.create = (req, res) => {
    res.render('users/register');
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