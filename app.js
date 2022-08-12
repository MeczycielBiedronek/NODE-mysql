const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;


// Create CONNECTION
const db = mysql.createConnection({
    host      : 'localhost',
    user      : 'root',
    password  : '',
    database  : 'nodemysql'
  });

  // CONNECT 

  db.connect((err)=>{
    if(err){ throw err;
    }
    console.log('MySQL connected')
  });

// ADD USER

app.get('/adduser', (req, res) => {
    let post = {
        name: 'Zdzisław Bąk',
        email: 'zidi@wp.pl',
        address: 'Bodzechów Podlaski, ul.Miodowa 123a, 25-222 Pizdobrody',
        taxnr: '123-1233-12-11',
        phone: '(046)123-112-312'
    };
    let sql = 'INSERT INTO users SET ?';
    let query = db.query(sql, post, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('User Added...');
    });
});

app.get('/adduser2', (req, res) => {
    let userMail = {
        email: 'novak@wp.pl'
    };
    let userData = {
        name: 'Adam Nowak',
        address: 'Kostomłoty, ul.Kremowa 987ą, 25-222 Fajfusowo',
        taxnr: '959-123-12-12',
        phone: '789789456'
    };
    let sql = 'INSERT INTO users SET ?, ? ON DUPLICATE KEY UPDATE ?';
    let query = db.query(sql, [userData, userMail, userData], (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Another User Added...');
    });
});

app.get('/adduser3', (req, res) => {
    let userMail = {
        email: 'novak@wp.pl'
    };
    let userData = {
        name: 'Krzysztof Fiutek',
        address: '33333333, ul.Kremowa 987ą, 25-222 Fajfusowo',
        taxnr: '333333333',
        phone: '33333333'
    };
    let sql = 'INSERT INTO users SET ?, ? ON DUPLICATE KEY UPDATE ?';
    let query = db.query(sql, [userData, userMail, userData], (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Another User Added...');
    });
});

app.get('/getusers', (req, res) => {
        let sql = 'SELECT id, name FROM users';
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        // console.log(result);
        res.send(result);
    });
});



app.get('/getuser/:phone', (req, res) => {
    let sql = `SELECT name FROM users WHERE phone=${req.params.phone}`;
let query = db.query(sql, (err, result) => {
    if (err) throw err;
    // console.log(result);
    res.send(result);
});
});




app.listen(port,()=>console.log(`Server running on port ${port}`))