import mongoose from 'mongoose';

// Create enum for prisha kinds
const prishaEnum = {
    none: 0,
    harchakot: 1,
    bedika: 2
};

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    minhag: String,
    // prisha is an array of numbers validated by the enum
    prisha: {
        type: [Number], // Array of numbers
        enum: Object.values(prishaEnum) // Restrict values to the enum
    },
    //
    cycles: [{
        //saving in both fields absolute greogrian date and absolute jdate
        firstBld: {gregorian: Number, jDate: Number},
        goodHefsek: {gregorian: Number, jDate: Number}
    }]
});

// Create collections
const User = mongoose.model('User', userSchema);

export { User, prishaEnum };
