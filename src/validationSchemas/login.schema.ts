import * as yup from 'yup';

export const LoginFormSchema = yup.object().shape({
    email: yup
        .string()
        .trim()
        .email('Email must have a valid format')
        .required('Email is required'),

    password: yup
        .string()
        .trim()
        .required('Password is required'),
})
