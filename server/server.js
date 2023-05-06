const express = require('express');
const app = express();
const server = require('http').createServer(app);
const bodyParser = require('body-parser');
const cors = require('cors');
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:4200', 
    methods: ['GET', 'POST']
  }
});
//aaaaaaa



const mysql = require('mysql');
app.use(cors());
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mizcom2'
});
app.use(bodyParser.json());

app.use(cors());

connection.connect((error) => {
  if (error) {
    console.error('Error connecting to MySQL database:', error);
  } else {
    console.log('Connected to MySQL database');
  }
});


io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('message', (data) => {
    console.log('Received message:', data);
    io.emit('message', data); // Broadcast the message to all connected clients
  });
  socket.on('register', (registerData) =>{
    console.log("AAAAA")

    const { username, password, nickname } = registerData;

    const query = `SELECT COUNT(*) as count FROM users WHERE username = ? OR nickname = ?`;
    connection.query(query, [username, nickname], (error, results) => {
      if (error) {
        console.error('Error querying the database:', error);
        return;
      }

      const count = results[0].count;

      if (count > 0) {
       
        socket.emit('registrationFailure');
      } else {
        const query2= `INSERT INTO users (username, password, nickname) VALUES (?, ?, ?)`;
        const values = [username, password, nickname];
  
    console.log(nickname)
        connection.query(query2, values, (error, results) => {
          if (error) {
            console.error('Error registering user:', error);
          } else {
            socket.emit('registrationSuccess');
          }});
      }
    });
  })




  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(8080, () => {
  console.log('Server listening on port 8080');
});