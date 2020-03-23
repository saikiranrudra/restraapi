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