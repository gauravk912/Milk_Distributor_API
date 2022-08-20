const express = require('express');
require('./db/mongoose.js');
const orderRouter = require('./routers/order');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(orderRouter);


app.listen(port,()=>{
    console.log('server is up on port ' +port);
});

