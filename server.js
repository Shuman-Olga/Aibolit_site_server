const express = require('express'),
  cors = require('cors'),
  app = express(),
  dotenv = require('dotenv');
dotenv.config();

const routes = require('./routes/index');

let corsOptions = {
  origin: 'http://localhost:8081',
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ message: 'Welcome' });
});

const db = require('./models');
// const Role = db.role;

db.sequelize.sync({ force: false }).then(() => {
  console.log('Drop and Resync Db');
  // initial();
});
app.use('/api', routes);

// set port, listen for requests
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// function initial() {
//   Role.create({
//     id: 1,
//     name: 'user',
//     rolename: 'Пользователь',
//   });

//   Role.create({
//     id: 2,
//     name: 'admin',
//     rolename: 'Администратор',
//   });

//   Role.create({
//     id: 3,
//     name: 'director',
//     rolename: 'Директор',
//   })

//   Role.create({
//     id: 4,
//     name: 'doctor',
//     rolename: 'Врач',
//   });

// }
