const mongoose = require("mongoose");
const { Schema } = mongoose;

const NotesSchema = Schema({

  //creating foreign key to link user schema with notes schema
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user' 
  },
  title:{
    type: String,
    // default: "Title"
    required: true
  },
  description:{
    type: String,
    required: true,
  },
  date:{
    type: Date,
    default: Date.now
  },
  tag:{
    type: String,
    default: "General"
  }
});

module.exports = mongoose.model("notes", NotesSchema);
