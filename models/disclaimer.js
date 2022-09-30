import mongoose from "mongoose";


const DisclaimerSchema = new mongoose.Schema({
    title: {
        type: String,
        maxLength: [50, 'Title is not allow more than 50 Characters'],
        required: [true, "title field is required"]
    },
    description: {
        type: String,
        maxLength: [255, 'Description is not allow more than 50 Characters'],
        required: [true, "description field is required"]
    }
}, {timestamps: true});

const Disclaimer = mongoose.model('Disclaimer', DisclaimerSchema);
export default Disclaimer