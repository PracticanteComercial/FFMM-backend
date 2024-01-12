const app = require("./app.js");
const db = require("./models");
const dotenv = require("dotenv");


dotenv.config();

const PORT = process.env.PORT || 3001;

db.sequelize.authenticate().then(() => {
    console.log("Database connected");
    app.listen(PORT, (err) => {
        if (err) console.log("Failed in listening", err);
        console.log(`Server is running at http://localhost:${PORT}`);
        return app;
    }   );
}).catch((err)=>{console.log("Error connecting to database", err);}   );