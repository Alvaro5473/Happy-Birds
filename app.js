const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const characterController = require('./controllers/characterController');
const gameController = require('./controllers/gameController');
const userController = require('./controllers/userController'); 
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layout');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Permitir JSON en el cuerpo de las solicitudes
app.use(express.static('public'));

app.use(session({
    secret: 'miSecretoSuperSecreto',  // Se usa para firmar el ID de la sesión (importante que sea secreto)
    resave: false,                    // No guardar sesión si no se ha modificado
    saveUninitialized: true,           // Guarda una sesión nueva aunque no se haya inicializado
    cookie: { secure: false }          // Configuración de las cookies de sesión (secure: true solo en HTTPS)
}));

app.use((req, res, next) => {
    res.locals.username = req.session.username;
    next();
});

// Root route
app.get('/', (req, res) => {
    res.redirect('/game');
});

// CRUD routes for characters
app.get('/characters', characterController.index);
app.post('/characters', characterController.store);
app.get('/characters/new', characterController.create);
app.get('/characters/:id/edit', characterController.edit);
app.post('/characters/:id/update', characterController.update);
app.post('/characters/:id/delete', characterController.delete);

// Game routes
app.get('/game', gameController.view);
app.post('/game/select', gameController.chooseCharacter);
app.put('/game/update', gameController.updateEnergy);

// Users router
app.get('/admin', userController.admin);
app.get('/register', userController.create);
app.post('/register', userController.store);
app.get('/users/:id/edit', userController.edit);
app.post('/users/:id/update', userController.update);
app.post('/users/:id/delete', userController.delete);
app.get('/login', userController.login);
app.post('/login', userController.logUser);
app.get('/logout', userController.logout);
app.get('/users', userController.index);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
