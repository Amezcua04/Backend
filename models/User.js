import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
    rol: {type: String, default: "admin"},
    name: {type: String, maxlength: 250, required: true},
    lastname: {type: String, maxlength: 250},
    email: {type: String, maxlength: 250, required: true},
    password: {type: String, maxlength: 250, required: true},
    state: {type: Number, default: 1} // 1 es activo  - 0 es inactivo
}, {
    timestamps: true
});

const User = mongoose.model("user", UserSchema);
export default User;