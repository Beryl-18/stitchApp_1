import mongoose from "mongoose";


const stitchSchema = new mongoose.Schema({
    text: {type: String, required: true},
    author:{type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    community: {type: mongoose.Schema.Types.ObjectId, ref: 'Community'},
    createdAt: {type:Date, default: Date.now()},
    parentId: {type: String},
    children: [
        {
            type: mongoose.Schema.Types.ObjectId, ref:'Stitch'
        }
    ]
    

})

const Stitch = mongoose.models.Stitch || mongoose.model('Stitch', stitchSchema);

export default Stitch;