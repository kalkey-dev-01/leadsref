import * as yup from 'yup';

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
const domainRules = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

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

export const emailFinderSchema = yup.object().shape({
    first_name: yup.string().required('Enter the first name'),
    last_name: yup.string().required('Enter the last name'),
    domain: yup.string().matches(domainRules, {message: 'Enter a valid url'}).required('Enter the Company Domain correctly')
})

export const domainSchema = yup.object().shape({
    domain: yup.string().matches(domainRules, {message: 'Enter a valid url'}).required('Enter the Company Domain correctly')
})

export const domainNameSchema = yup.string().required("Enter The Name You want to search")
