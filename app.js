var express 	=   require("express"),
methodOverride  = 	require("method-override"),
bodyParser  	=   require("body-parser"),
mongoose    	=   require("mongoose"),
app         	=   express();


mongoose.connect("mongodb://localhost/blogApp");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));

var Blogschema = new mongoose.Schema({
	title:String,
	image:String,
	description:String,
	date: {type:Date,default:Date.now}
});


var Blog = mongoose.model("Blog",Blogschema);




app.get("/",function(req,res){
	res.redirect("posts");
});

app.get("/posts",function(req,res){
	Blog.find({},function(err,posts){
		if(err){
			console.log(err);
		}else{
			res.render("index",{posts:posts});

		}
	});
});

app.post("/posts",function(req,res){
	Blog.create(req.body.blog,function(err,blog){
		if(err){
			res.render("new");
		}else{
			res.redirect("/posts");
		}
	});
});

app.get("/posts/new",function(req,res){
	res.render("new");
});

app.get("/posts/:id",function(req,res){
	Blog.findById(req.params.id,function(err,post){
		if(err){
			res.redirect("/posts");
		}else{
			res.render("show",{post:post})
		}
	})
});

app.get("/posts/:id/edit",function(req,res){
	Blog.findById(req.params.id,function(err,found){
		if(err){
			res.redirect("/posts");
		}else{
			res.render("edit",{post:found});
		}
	})
});
app.put("/posts/:id",function(req,res){
	Blog.findByIdAndUpdate(req.params.id,req.body.blog,function(err,updated){
		if(err){
			res.redirect("/posts/");
		}else{
			res.redirect("/posts/"+req.params.id);
		}
	});
});

app.delete("/posts/:id",function(req,res){
	Blog.findByIdAndRemove(req.params.id,function(err,destroyed){
		if(err){
			res,redirect("/posts");
		}else{
			res.redirect("/posts");
		}
	})
});



app.listen(3000,function(){
	console.log("server is up and running !");
});