import mongoose, { mongo } from "mongoose";

const todoSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    complete: {
        type: Boolean,
        default: true
    },
    createdBy: {
        // using this field to create relation with other schemas
        // here after defining types its imp to pass ref , ref has to be the exact model name you are connecting with

        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    subTodos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubTodo"
    }],

},
    {
        timestamps: true
    });

export const Todo = mongoose.model("Todo", todoSchema);
