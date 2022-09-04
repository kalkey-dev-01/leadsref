import * as yup from 'yup';

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

export const signUpSchema = yup.object().shape({
    email: yup.string().email('Please Enter a valid Email').required('Required'),
    username: yup.string().min(4).required('Please Enter Your Name'),
    password: yup.string().min(8).matches(passwordRules, { message: 'Please create a stronger password' }).required('Required'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Required')
})

export const signInSchema = yup.object().shape({
    email: yup.string().email('Please Enter a valid Email').required('Required'),
    password: yup.string().min(8).matches(passwordRules, {message: 'Enter a valid password'}).required('Required')  
})

export const loginSchema = yup.object().shape({
    email: yup.string().email('Enter a valid email').required('Email address is Required for this login method'),
    password: yup.string().min(8).matches(passwordRules , {message: 'Enter correct password'}).required('Required')
})