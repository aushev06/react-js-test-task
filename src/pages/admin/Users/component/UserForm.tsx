import React from "react";
import {Breadcrumb, Form, Input, notification} from "antd";
import {PhoneOutlined, UserOutlined, HomeOutlined, MailOutlined, LockOutlined} from '@ant-design/icons';

import * as yup from 'yup';

import {Link, useNavigate} from "react-router-dom";
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm, Controller} from "react-hook-form";
import {useParams} from "react-router";
import {createUser, getOneUserById} from "../../../../core/api/users.service";
import Block from "../../../../components/Block";
import {validateField} from "../../../../helpers/validateField";
import {Button} from "../../../../components/Button";
import {AxiosError} from "axios";
import {axios} from "../../../../core/axios";

export const UserForm = () => {
    const navigate = useNavigate();
    const {id} = useParams<{ id: string }>();
    const {register, handleSubmit, formState, setValue, control} = useForm({
        mode: 'onTouched',
        resolver: yupResolver(
            yup.object().shape({
                id: yup.string().uuid(),
                firstName: yup.string().required(),
                lastName: yup.string().required(),
                password: yup.string().required(),
                confirmPassword: yup.string().oneOf([yup.ref('password'), null], "Пароли не совпадают").required(),
                email: yup.string().email().required(),
            }),
        ),
    });


    React.useEffect(() => {
        if (id) {
            getOneUserById(id as string)
                .then(response => {
                    setValue('firstName', response.firstName);
                    setValue('lastName', response.lastName);
                    setValue('email', response.email);
                })

        }
    }, [id])

    const onSubmit = async (data: unknown) => {

        try {
            await createUser(data);
            navigate('/users');
        } catch (e) {
            if (axios.isAxiosError(e)) {
                const error: AxiosError = e;
                notification.error({
                    message: 'Пользователь',
                    description: 'Ошибка при заполнении формы',
                });
            }
        }
    }

    return (
        <div>
            <Breadcrumb style={{margin: '16px 0'}}>
                <Breadcrumb.Item>
                    <Link to={"/users"}>
                        Пользователи
                    </Link>
                </Breadcrumb.Item>

            </Breadcrumb>

            <Block>
                <Form className="user-form">
                    <Form.Item
                        validateStatus={validateField("email", formState.touchedFields, formState.errors)}
                        help={!formState.touchedFields.email ? "" : formState.errors.email?.message as string}
                        hasFeedback
                    >
                        <Controller control={control} render={({ field }) => {
                            return (
                                <Input
                                    {...field}
                                    id="email"
                                    prefix={<MailOutlined style={{color: "rgba(0,0,0,.25)"}}/>}
                                    size="middle"
                                    placeholder="E-mail"
                                />
                            )
                        }} name={'email'} />
                    </Form.Item>

                    <Form.Item
                        validateStatus={validateField("password", formState.touchedFields, formState.errors)}
                        help={!formState.touchedFields.password ? "" : formState.errors.password?.message as string}
                        hasFeedback
                    >
                        <Controller control={control} render={({ field }) => {
                            return (
                                <Input
                                    {...field}
                                    id="password"
                                    prefix={<LockOutlined style={{color: "rgba(0,0,0,.25)"}}/>}
                                    size="middle"
                                    placeholder="Пароль"
                                    type={'password'}
                                />
                            )
                        }} name={'password'} />
                    </Form.Item>

                    <Form.Item
                        validateStatus={validateField("confirmPassword", formState.touchedFields, formState.errors)}
                        help={!formState.touchedFields.confirmPassword ? "" : formState.errors.confirmPassword?.message as string}
                        hasFeedback
                    >
                        <Controller control={control} render={({ field }) => {
                            return (
                                <Input
                                    {...field}
                                    id="confirmPassword"
                                    prefix={<LockOutlined style={{color: "rgba(0,0,0,.25)"}}/>}
                                    size="middle"
                                    placeholder="Подтверждение пароля"
                                    type={'password'}
                                />
                            )
                        }} name={'confirmPassword'} />
                    </Form.Item>


                    <Form.Item
                        validateStatus={validateField("firstName", formState.touchedFields, formState.errors)}
                        help={!formState.touchedFields.firstName ? "" : formState.errors.firstName?.message as string}
                        hasFeedback
                    >
                       <Controller control={control} render={({ field }) => {
                           return (
                               <Input
                                   {...field}
                                   id="name"
                                   prefix={<UserOutlined type="user" style={{color: "rgba(0,0,0,.25)"}}/>}
                                   size="middle"
                                   placeholder="Имя"
                               />
                           )
                       }} name={'firstName'} />
                    </Form.Item>

                    <Form.Item
                        validateStatus={validateField("lastName", formState.touchedFields, formState.errors)}
                        help={!formState.touchedFields.lastName ? "" : formState.errors.lastName?.message as string}
                        hasFeedback
                    >
                        <Controller control={control} render={({ field }) => {
                            return (
                                <Input
                                    {...field}
                                    prefix={<UserOutlined type="user" style={{color: "rgba(0,0,0,.25)"}}/>}
                                    size="middle"
                                    placeholder="Фамилия"
                                />
                            )
                        }} name={'lastName'} />
                    </Form.Item>

                    <Form.Item>
                        {formState.isSubmitting && !formState.isValid && <span>Ошибка!</span>}
                        <Button
                            disabled={formState.isSubmitting}
                            onClick={handleSubmit(onSubmit)}
                            type="primary"
                            size="middle"
                        >
                            Сохранить
                        </Button>
                    </Form.Item>

                </Form>
            </Block>
        </div>
    );
};
