const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

//connect to database
mongoose
    .connect(process.env.DATABASE_LOCAL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("DB connection successful!"));

const port = process.env.PORT || 3000;

//listen to port
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});
