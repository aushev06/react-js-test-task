import {useParams} from "react-router";
import React from "react";
import {getOneTest, sendAnswers} from "../../../core/api/tests.service";
import { Steps, message,Checkbox } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

import {Button} from "../../../components/Button";
import {IQuestion, ITest} from "../../../interfaces";
import {useNavigate} from "react-router-dom";

export const RunTest = () => {
    const params = useParams<{id: string}>();
    const navigate = useNavigate();
    const [test, setTest] = React.useState<ITest | null>(null)

    const [current, setCurrent] = React.useState(0);
    const [selectedAnswers, setSelectedAnswers] = React.useState<string[]>([])
    const [questions, setQuestions] = React.useState<IQuestion[]>([])

    const next = () => {
        const questionId = test?.questions[current].id as string;
        setQuestions([...questions,
            {id: questionId, answers: selectedAnswers.map(answer => ({id: answer}))} as IQuestion
        ])

        setSelectedAnswers([]);

        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const onChange = (e: CheckboxChangeEvent) => {
        if (e.target.checked) {
            setSelectedAnswers([...selectedAnswers, e.target.value])
        } else {
            setSelectedAnswers(selectedAnswers.filter(answerId => answerId !== e.target.value));
        }
    };

    const onDone = async () => {
        const questionId = test?.questions[current].id as string;
        const sendQuestions = [...questions,
            {id: questionId, answers: selectedAnswers.map(answer => ({id: answer}))} as IQuestion
        ]

        const data = await sendAnswers(params.id as string, sendQuestions);
        message.success(`Вы завершили тест, процент правильных ответов: ${data.progress}%`)
        setTimeout(() => navigate('/'), 1000)
    }

    React.useEffect(() => {
        getOneTest(params.id as string).then(response => {
            setTest(response);
        })


    }, [])

    if (!test) {
        return <div>Загрузка...</div>
    }


    if (!test.questions.length) {
        return null;
    }

    const currentQuestion = test.questions[current];

    return (
        <div className={"site-content"}>
            <div className="site-layout-content">
                <div key={currentQuestion.id}>
                    {currentQuestion.text}


                    {currentQuestion.answers.map((answer, answerIdx) => {
                        return (
                            <div key={answer.id}>
                                <Checkbox value={answer.id} onChange={onChange}>{answer.text}</Checkbox>

                            </div>
                        )
                    })}
                </div>
                <br/>
                {current < test.questions.length - 1 && (
                    <Button type="primary" onClick={() => next()}>
                        Следущий вопрос
                    </Button>
                )}
                {current === test.questions.length - 1 && (
                    <Button type="primary" onClick={onDone}>
                        Отправить
                    </Button>
                )}
            </div>
        </div>
    )
}
