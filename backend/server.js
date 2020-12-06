import express from 'express';
import { json, urlencoded } from 'body-parser';
import { connect } from './utils/db.js';
import userRouter from './resources/user/user.router.js'
import { signup, signin, protect } from './utils/auth.js'

const app = express();
const PORT = 8833;

app.use(json())
app.use(urlencoded({ extended: true }))

connect("mongodb://mongo:27017/testing", {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

app.get("/api/", (req, res) => {
  res.send({'hello': 'my-friend'});
});

app.get('/api/posts/', (req, res) => {
	return res.send({'posts': [1,2,3,4,5,6]})
});

app.post('/api/signup', signup)
app.post('/api/signin', signin)

app.use('/api/user', protect, userRouter);

app.listen(PORT, () => {
  console.log(`server is up and running on port ${PORT}`);
});