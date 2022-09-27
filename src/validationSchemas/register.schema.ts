import * as yup from 'yup';

export const RegisterFormSchema = yup.object().shape({
    email: yup
        .string()
        .trim()
        .email('Email must have a valid format')
        .required('Email is required'),

    password: yup
        .string()
        .trim()
        .required('Password is required'),

    username: yup.string().trim().required('Username is required')
})
