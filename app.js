const express = require('express');
const app = express();

const route = require('./route/route')

app.use(express.json());

app.use("/",route);


app.listen(8080,()=>console.log('listening on port 8080'));