const mongoose = require('mongoose')

exports.connectToDB = async () => {
    try {
        const connect = await mongoose.connect('mongodb+srv://leoman2129:<db_password>@cluster0.9o0t2.mongodb.net/', {});
        console.log("Database connection successful");
    } catch(e) {
        console.log("error : ", e);
        process.exit(1);
    }
}

