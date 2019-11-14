const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;
const models = require('./models');
const userRoutes = require('./routes/userRoutes');
const groupRoutes = require('./routes/groupRoutes');
let db;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/user', userRoutes);
app.use('/api/group', groupRoutes);

app.get('/', function (req, res) {
  res.json({ express : 'Hello world!' });
});

const startDB = (done) => {
  models.init((database) => {
    userRoutes.init(database);
    groupRoutes.init(database);
    db = database;
    db.sequelize.sync({ force: true }).then(() => {
      done();
    });
  }); 
};

// start app or defer to test env and provide utils
if (process.env.NODE_ENV !== 'test') {
  startDB(() => {
    app.listen(port, () => {
      console.log(`App running on port ${port}.`);
    });
  });
} else {
  app.startDB = startDB
  module.exports = app;
}
