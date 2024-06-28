import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
    image: {
        type: String
    },
    title: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    releaseDate: {
        type: Date,
        required: true
    },
    genre: [{
        type: String,
        required: true
    }],
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 10
    },
    description: {
        type: String,
        required: true
    },
    cast: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cast'
    }],
    crew: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Crew'
    }]
})

export default mongoose.model('Movie', movieSchema);