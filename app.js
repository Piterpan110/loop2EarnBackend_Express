const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const userController = require('./src/controller/user-controller');
const focusController = require('./src/controller/focus-controller');
const tokenService = require('./src/service/token-service');
const verifyToken = require('./src/middleware/token-verify');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyparser.json());
app.use(cors());
app.use('/signup', userController.signup);
app.use('/login', userController.login);
app.use('/dashboard', verifyToken.verifyAccessToken);
app.use('/focus/create', focusController.Create);
app.use('/focus/edit', focusController.Edit);
app.use('/focus/delete', focusController.Delete);
app.use('/focus/load', focusController.getAll);
app.use('/refresh-access', tokenService.refreshAcess);

app.listen(port, async () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
