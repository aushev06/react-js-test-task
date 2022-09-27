import React from "react";
import { Form, Input } from "antd";
import { Link } from "react-router-dom";
import { yupResolver } from '@hookform/resolvers/yup';

import { MailOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import Block from "../../components/Block";
import {useForm, Controller } from "react-hook-form";
import {Button} from "../../components/Button";
import {LoginFormSchema} from "../../validationSchemas/login.schema";
import {validateField} from "../../helpers/validateField";
import {RegisterFormSchema} from "../../validationSchemas/register.schema";

type Props = {}

export const RegisterForm: React.FC<Props> = props => {
    const { getValues, register, control, handleSubmit, formState } = useForm({
        mode: 'onTouched',
        resolver: yupResolver(RegisterFormSchema),
        defaultValues: {
            email: '',
            password: '',
            username: ''
        },
    });

    const onSubmit = (data: unknown) => console.log(data)

    return (
        <div>
            <div className="auth__top">
                <h2>Зарегистрироваться</h2>
                <p>Пожалуйста, введите данные для регистрации</p>
            </div>
            <Block>
                <Form className="register-form">
                    <Form.Item
                        validateStatus={validateField('username', formState.touchedFields, formState.errors)}
                        help={!formState.touchedFields.username ? '' : formState.errors.username?.message}
                        hasFeedback
                    >
                        <Controller control={control} render={({ field, formState, fieldState }) => {
                            return  (
                                <Input
                                    {...field}
                                    id="email"
                                    prefix={<UserOutlined type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
                                    size="large"
                                    placeholder="Username"
                                />
                            )
                        }} {...register('username')} />
                    </Form.Item>


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
                            Зарегистрироваться
                        </Button>
                    </Form.Item>


                    <Link className="auth__register-link" to="/login">
                        Войти
                    </Link>
                </Form>
            </Block>
        </div>
    );
};

