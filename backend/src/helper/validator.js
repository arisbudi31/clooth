const validator = require('password-validator')
const validatorEmail = require('validator')
const joi = require('joi')
const { joiPasswordExtendCore } = require('joi-password');
const joiPassword = joi.extend(joiPasswordExtendCore);
// const { joiPassword } = require('joi-password')

const adminnameSchema = new validator()
adminnameSchema
  .is().min(6, 'Too short, adminname should have minimum 6 characters')
  .is().max(30, 'Too long, adminname or email has to maximum 30 characters')

const passwordSchema = new validator()
passwordSchema
  .is().min(8, 'Too short, password should have minimum 8 chacracters')
  .has().uppercase(1, 'Password should have minimum 1 uppercase letter')
  .has().digits(1, 'Password should have minimum 1 digit letter')
  .has().not().spaces(1, 'Password should not have spaces')

const emailSchema = new validator()
  .min(6, 'Too short, email should have minimum 6 chacracters')
  .usingPlugin(validatorEmail.isEmail, 'Email should contain @ character')

const registerSchema = joi.object({
  fullname: joi.string().min(3).max(45).required(),
  username: joi.string().min(3).max(45).alphanum().required(),
  email: joi.string().email().required(),
  password: joiPassword
    .string()
    .min(8)
    .max(45)
    .minOfSpecialCharacters(1)
    .minOfLowercase(1)
    .minOfUppercase(1)
    .minOfNumeric(1)
    .noWhiteSpaces()
    .required()
    .messages({
      "password.minOfUppercase": "{#label} should contain at least {#min} uppercase character",
      "password.minOfSpecialCharacters": "{#label} should contain at least {#min} special character",
      "password.minOfLowercase": "{#label} should contain at least {#min} lowercase character",
      "password.minOfNumeric": "{#label} should contain at least {#min} numeric character",
      "password.noWhiteSpaces": "{#label} should not contain white spaces",
    }),
  re_password: joi.valid(joi.ref("password")).messages({
    "any.only": "Password must match",
  })
})

const loginSchema = joi.object({
  login: joi
    .alternatives()
    .try(joi.string().min(6).max(45).alphanum(), joi.string().email())
    .required(),
  password: joi.string().required(),
});

const editSchema = joi.object({
  username: joi.string().min(6).max(45).alphanum().required(),
  fullname: joi.string().min(6).max(45).required(),
  dob: joi.string().required(),
  gender: joi.string().required(),
});

module.exports = { adminnameSchema, passwordSchema, emailSchema, registerSchema, loginSchema, editSchema }
