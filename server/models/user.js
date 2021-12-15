const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        bio: {
            type: String,
            required: false
        }
    }
)
const User = mongoose.model('User', UserSchema);

