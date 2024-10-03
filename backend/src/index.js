const express = require('express');

const usersRoutes = require('./routes/users.js')

const app = express();

// app.method(path, handler);
app.use('/users', usersRoutes);

app.listen(400, () => {
    console.log('Server berhasil di running di port 4000');
})