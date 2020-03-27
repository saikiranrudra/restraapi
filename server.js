const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const app = require("./app");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;
const URI = process.env.URI || "mongodb://localhost:27017/restaurant";

mongoose.connect(URI, {
	useNewUrlParser: true,
    useUnifiedTopology: true	
})
	.then(() => console.log("Connected to db successfully..."))
	.catch((err) => console.error("Failed to connect db...", err));	

app.listen(PORT, () => console.log(`App is listenning to port ${PORT}`));

// TODOS
/**
* 1) check login route
* 2) check auth middleware and go through it once 
* 3) protect all routes with protect middlware written in auth route
* 4) create a transection route 
* 	req.userId // for user id. check auth middleware 
* 	req.body{
		items: [{
			rating(pin): 5 // ignore
			visibility(pin): "visible" // ignore
			rating(pin): 5 // ignore
			dateOfCreation(pin): "202 50-03-24T15:03:37.108Z" //ignore
			_id(pin): "5e7a234ea103291c1f2d83d4" // store accorging to model
			name(pin): "Uttapam" // ignore
			price(pin): 100 // use to calculate total
			cuisine(pin): "South Indian" //ignore
			img(pin): // ignore
			__v(pin): 0 // ignore
			quantity(pin): 1 // store accorign to model
		}]
	}
* 5) get bill route
* based on req,userId find the transection and return transection	

*/