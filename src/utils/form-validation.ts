import * as yup from 'yup';

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

export const signUpSchema = yup.object().shape({
    email: yup.string().email('Please Enter a valid Email').required('Required'),
    profession: yup.string().min(4).required('Please Enter Your Profession'),
    password: yup.string().min(8).matches(passwordRules, { message: 'Please create a stronger password' }).required('Required'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Required')
})

export const signInSchema = yup.object().shape({
    email: yup.string().email('Please Enter a valid Email').required('Required'),
    password: yup.string().min(8).matches(passwordRules, {message: 'Enter a valid password'}).required('Required')  
})