require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'/src/views/'));
const mainRouter = require('./src/routes/main.routes');
app.use(mainRouter);
app.use('/habitacion27', require('./src/routes/habitacion27.router'));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));