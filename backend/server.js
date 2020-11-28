const express = require("express");
const mongoose = require("mongoose");
const app = express();

const PORT = 8833;

mongoose.connect("mongodb://mongo:27017/testing", {useNewUrlParser: true, useUnifiedTopology: true});

app.get("/", function(req, res) {
  res.send({'hello': 'my-friend'});
});

app.get('/posts/', (req, res) => {
	return res.send({'posts': [1,2,3,4,5,6]})
})

app.listen(PORT, function() {
  console.log(`server is up and running on port ${PORT}`);
});