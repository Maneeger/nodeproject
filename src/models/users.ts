import  mongoose, {Document, Schema} from 'mongoose';

interface IUser extends Document {
    name: string;
    email: string;
    phone:string;
    image:string;
    created: Date;
}

const userSchema: Schema<IUser> = new Schema({
    name:{
        type: String,
        required: true,
        minlength:[3,'Name must be atleast 3 characters long']
    },
    email:{
        type: String,
        required: true,
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
    },
    phone:{
        type: String,
        required: true,
        minlength:[10,'Number Should not be less than 10 digits'],
        maxlength:[15,'Number should not be more than 15 digits'],
    },
    image:{
        type: String, 
        required: [true, 'Image URL is required'],
    },
    created:{
        type:Date,
        default:Date.now,
        required:true,
    }
});

const User = mongoose.model<IUser>('User', userSchema);
export default User;