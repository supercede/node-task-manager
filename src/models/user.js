const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('entry is not a valid email address');
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a valid number');
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        validate(value) {
            if (value.includes('password')) {
                throw new Error('Password not allowed');
            }

        }
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
})

userSchema.methods.generateToken = async function(){
    const user = this;

    const token = jwt.sign({_id: user._id.toString()}, 'mykeygoeshere');

    user.tokens = user.tokens.concat({ token });
    await user.save();

    return token;
}

userSchema.statics.findUserByCredentials = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Unable to log in')
    }
    // console.log(password)

    const isMatched = await bcrypt.compare(password, user.password);
    // console.log(isMatched)

    if (!isMatched) {
        throw new Error('Password or Email incorrect');
    }

    return user;
}


userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
})

const User = mongoose.model('User', userSchema);



module.exports = User;