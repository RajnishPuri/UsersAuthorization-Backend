const express = require('express');
const Router = express.Router();

const { signUp } = require('../Controller/signUp');
const { login } = require('../Controller/login');
const { confirmUser } = require('../Controller/confirmUser');

Router.post('/signup', signUp);
Router.post('/login', login);
Router.post('/confirm-user', confirmUser);

module.exports = Router;