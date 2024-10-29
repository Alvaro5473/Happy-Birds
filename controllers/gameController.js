const characterModel = require('../models/characterModel');
const gameModel = require('../models/gameModel');

// Middleware para verificar si el usuario está logueado
exports.isAuthenticated = (req, res, next) => {
    if (req.session && req.session.username) {
        return next();
    } else {
        res.redirect('/login');
    }
};

// Middleware para verificar si el usuario es el admin
exports.isAdmin = (req, res, next) => {
    if (req.session.username === 'admin') {
        return next();
    } else {
        res.redirect('/game');
    }
};

// Manejar la selección de un personaje para el juego
exports.chooseCharacter = (req, res) => {
    req.session.characterId = parseInt(req.body.characterId);
    res.redirect('/game');
};

// Mostrar la vista del juego
exports.view = (req, res) => {
    const character = characterModel.findCharacterById(req.session.characterId);
    res.render('game', { character });
};

// Actualizar el nivel de energía dinámicamente (REST API)
exports.updateEnergy = (req, res) => {
    const character = characterModel.findCharacterById(req.session.characterId);

    const action = req.body.action;

    switch (action) {
        case 'increase':
            character.life = Math.min(100, character.life + 10); // Aumentar el nivel de energía
            break;
        case 'decrease':
            character.life = Math.max(0, character.life - 10); // Reducir el nivel de energía
            break;
        default:
            return res.status(400).json({ message: 'Acción no válida' });
    }

    characterModel.saveCharacter(character); // Guardar el estado actualizado del personaje
    res.json({ life: character.life }); // Responder con el nuevo nivel de energía
};

exports.map = (req, res) => {
    const character = characterModel.findCharacterById(req.session.characterId);
    res.render('map', {character, layout: false});
};