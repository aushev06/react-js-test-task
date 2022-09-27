import {Control, useFieldArray, useFormContext, UseFormRegister} from "react-hook-form";
import React from "react";
import {TestAnswer} from "./TestAnswer";
import {Button} from "../../../components/Button";

export const TestQuestion = () => {
    const { control, register } = useFormContext()
    const {fields, append, remove} = useFieldArray({
        control,
        name: 'questions',
    });

    return (
        <div>
            {fields.map((question, idx) => {
                return (
                    <div className={'question'} key={idx}>
                        <input type="text" placeholder={'Вопрос'}  {...register(`questions.${idx}.text`)} />
                        <br/>

                        <TestAnswer idx={idx} />
                    </div>
                )
            })}

            <Button onClick={() => append({text: '', answers: [{text: ''}]})}>
                +
            </Button>

        </div>
    )
}
