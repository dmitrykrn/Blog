const express = require('express');
const app = express(),
      bodyParser = require("body-parser");
      port = 3080;

const users = [];

app.use(bodyParser.json());
app.use(express.static(process.cwd()+"/angular-blog/dist/nodejs-blog/"));

app.get('/api/users', (req, res) => {

    const user={
        'firstName' : 'Dmitry',
        'lastName' : 'Kokorin',
        'email' : 'Dmitry@mail.com'
    };

    users.push(user);

  res.json(users);
});


app.get('/', (req,res) => {
  res.sendFile(process.cwd()+"/my-app/dist/angular-nodejs-example/index.html")
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});
