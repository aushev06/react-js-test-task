import {Link, useNavigate} from "react-router-dom";
import {useParams} from "react-router";
import {Controller, useFieldArray, useForm, FormProvider} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {Breadcrumb, Form, Input, notification} from "antd";
import Block from "../../../components/Block";
import {validateField} from "../../../helpers/validateField";
import {LockOutlined, MailOutlined, UserOutlined} from "@ant-design/icons";
import {Button} from "../../../components/Button";
import React from "react";
import {TestQuestion} from "./TestQuestion";
import {createTests, getOneTest} from "../../../core/api/tests.service";
import {getOneUserById} from "../../../core/api/users.service";

export const TestsForm = () => {
    const navigate = useNavigate();
    const params = useParams();
    const form = useForm({
        mode: 'onTouched',
        defaultValues: {
            name: '',
            questions: [{text: '', answers: [{text: '', isRight: false}]}]
        },
        resolver: yupResolver(
            yup.object().shape({
                name: yup.string().required(),
                questions: yup.array()
            }),
        ),
    });


    React.useEffect(() => {
        if (params.id) {
            getOneTest(params.id as string)
                .then(response => {
                    form.setValue('name', response.name);
                    response.questions.forEach((item, idx) => {
                        form.setValue(`questions.${idx}.text`, item.text);
                        item.answers.forEach((answer, answerIdx) => {
                            form.setValue(`questions.${idx}.answers.${answerIdx}.text`, answer.text)
                        })
                    })
                })

        }
    }, [params])

    const formState = form.formState;
    const control = form.control;
    const register = form.register;

    const onSubmit = async (data: unknown) => {
        try {
            if(!params.id) {
                await createTests(data);
            }
        } catch (e) {
            notification.error({
                message: 'Тест',
                description: 'Ошибка при заполнении формы',
            });
        }
    }

    return (
        <FormProvider {...form}>
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
                            validateStatus={validateField("name", formState.touchedFields, formState.errors)}
                            help={!formState.touchedFields.name ? "" : formState.errors.name?.message as string}
                            hasFeedback
                        >
                            <Controller control={control} render={({field}) => {
                                return (
                                    <Input
                                        {...field}
                                        id="name"
                                        prefix={<MailOutlined style={{color: "rgba(0,0,0,.25)"}}/>}
                                        size="middle"
                                        placeholder="Название"
                                    />
                                )
                            }} name={'name'}/>
                        </Form.Item>
                        <TestQuestion/>

                        <Form.Item>
                            {formState.isSubmitting && !formState.isValid && <span>Ошибка!</span>}
                            <Button
                                disabled={formState.isSubmitting}
                                onClick={form.handleSubmit(onSubmit)}
                                type="primary"
                                size="middle"
                            >
                                Сохранить
                            </Button>
                        </Form.Item>

                    </Form>
                </Block>
            </div>
        </FormProvider>
    );
}
