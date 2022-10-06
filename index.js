const express = require('express')
const userRouter = require('./routes/routes.user')
const app = express()
const port = process.env.PORT || 5000;
app.use(express.json())
app.get('/', (req, res) => {
  res.send('Hello World!');
})
app.use('/user',userRouter);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})