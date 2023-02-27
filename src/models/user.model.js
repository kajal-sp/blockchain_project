const mongoose = require('mongoose');
// eslint-disable-next-line import/no-unresolved
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');



// define the AuditLogChain model for data storage
const userSchema = new mongoose.Schema(
  {
    data: { type: mongoose.Schema.Types.Mixed },
    preceding_hash: { type: mongoose.Schema.Types.String },
    hash: { type: mongoose.Schema.Types.String },
    iterations: { type: mongoose.Schema.Types.Number },
    created_on: { type: Number },
  },
  {
    collection: 'users',
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);
userSchema.virtual('id').get(function () {
  return String(this._id);
});
exports.UserBlockChain = mongoose.model('UserBlockChain', userSchema);






// const userSchema = mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       trim: true,
//       lowercase: true,
//       validate(value) {
//         if (!validator.isEmail(value)) {
//           throw new Error('Invalid email');
//         }
//       },
//     },
//     password: {
//       type: String,
//       required: true,
//       trim: true,
//       minlength: 8,
//       validate(value) {
//         if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
//           throw new Error('Password must contain at least one letter and one number');
//         }
//       },
//       private: true, // used by the toJSON plugin
//     },
//     role: {
//       type: String,
//       enum: roles,
//       default: 'user',
//     },
//     isEmailVerified: {
//       type: Boolean,
//       default: false,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// // add plugin that converts mongoose to json
// userSchema.plugin(toJSON);
// userSchema.plugin(paginate);

// /**
//  * Check if email is taken
//  * @param {string} email - The user's email
//  * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
//  * @returns {Promise<boolean>}
//  */
// userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
//   const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
//   return !!user;
// };

// /**
//  * Check if password matches the user's password
//  * @param {string} password
//  * @returns {Promise<boolean>}
//  */
// userSchema.methods.isPasswordMatch = async function (password) {
//   const user = this;
//   return bcrypt.compare(password, user.password);
// };

// userSchema.pre('save', async function (next) {
//   const user = this;
//   if (user.isModified('password')) {
//     user.password = await bcrypt.hash(user.password, 8);
//   }
//   next();
// });

// /**
//  * @typedef User
//  */
// const User = mongoose.model('User', userSchema);

// module.exports = User;
