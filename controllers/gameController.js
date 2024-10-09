const characterModel = require('../models/characterModel');
const gameModel = require('../models/gameModel');

// Manejar la selección de un personaje para el juego
exports.chooseCharacter = (req, res) => {
    const gameState = gameModel.getGameState();
    gameState.characterId = parseInt(req.body.characterId);
    gameModel.saveGameState(gameState);
    res.redirect('/game');
};

// Mostrar la vista del juego
exports.view = (req, res) => {
    const gameState = gameModel.getGameState();
    const character = characterModel.findCharacterById(gameState.characterId);
    res.render('game', { character });
};

// Actualizar el nivel de energía dinámicamente (REST API)
exports.updateEnergy = (req, res) => {
    const gameState = gameModel.getGameState();
    const character = characterModel.findCharacterById(gameState.characterId);

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
