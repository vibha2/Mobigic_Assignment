const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    data: {
        type: Buffer,
    },
    passcode: {
        type: String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
    
    
});


const File = mongoose.model("File", fileSchema);
module.exports = File;