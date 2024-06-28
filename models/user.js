import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true, minLength: 6},
    favoriteMovies: [{type: String}]
}, {timestamps: true});

userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10)
    }
    next()
})

export default mongoose.model('User', userSchema);