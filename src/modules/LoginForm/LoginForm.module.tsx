import React from "react";
import { Form, Input } from "antd";
import {Link, useNavigate} from "react-router-dom";
import { yupResolver } from '@hookform/resolvers/yup';
import {  useAppDispatch } from '../../app/hooks'


import { MailOutlined, LockOutlined } from '@ant-design/icons';
import Block from "../../components/Block";
import {useForm, Controller } from "react-hook-form";
import {Button} from "../../components/Button";
import {LoginFormSchema} from "../../validationSchemas/login.schema";
import {validateField} from "../../helpers/validateField";
import {login} from "../../core/api/auth.service";
import {set} from "../../redux/userSlice";

type Props = {}

export const LoginForm: React.FC<Props> = props => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { getValues, register, control, handleSubmit, formState } = useForm({
        mode: 'onTouched',
        resolver: yupResolver(LoginFormSchema),
        defaultValues: {
            email: '',
            password: ''
        },
    });

    const onSubmit = async (data: unknown) => {
        try {
            const response = await login(getValues()['email'], getValues()['password']);
            localStorage.setItem('token', response.token);
            dispatch(set(response.user));
            navigate('/');

        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div>
            <div className="auth__top">
                <h2>Войти в аккаунт</h2>
                <p>Пожалуйста, войдите в свой аккаунт</p>
            </div>
            <Block>
                <Form className="login-form">
                    <Form.Item
                        validateStatus={validateField('email', formState.touchedFields, formState.errors)}
                        help={!formState.touchedFields.email ? '' : formState.errors.email?.message}
                        hasFeedback
                    >
                       <Controller control={control} render={({ field, formState, fieldState }) => {
                           return  (
                               <Input
                                   {...field}
                                   id="email"
                                   prefix={<MailOutlined type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
                                   size="large"
                                   placeholder="E-Mail"
                               />
                           )
                       }} {...register('email')} />
                    </Form.Item>

                    <Form.Item
                        validateStatus={validateField('password', formState.touchedFields, formState.errors)}
                        help={!formState.touchedFields.password ? '' : formState.errors.password?.message}
                        hasFeedback
                    >
                        <Controller control={control} render={({ field, formState, fieldState }) => {
                            return  (
                                <Input
                                    {...field}
                                    id="password"
                                    prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                                    size="large"
                                    placeholder="Password"
                                    type={'password'}
                                />
                            )
                        }} {...register('password')} />
                    </Form.Item>



                    <Form.Item>
                        <Button
                            disabled={false}
                            onClick={handleSubmit(onSubmit)}
                            type="primary"
                            size="large"
                        >
                            Войти в аккаунт
                        </Button>
                    </Form.Item>


                    <Link className="auth__register-link" to="/register">
                        Зарегистрироваться
                    </Link>
                </Form>
            </Block>
        </div>
    );
};

