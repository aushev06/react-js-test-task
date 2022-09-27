import {Control, useFieldArray, useFormContext, UseFormRegister} from "react-hook-form";
import React, {useContext} from "react";
import {Button} from "../../../components/Button";

type Props = {
    idx: number
}
export const TestAnswer = ({idx}: Props) => {
    const {control, register} = useFormContext();
    const {fields, append, remove} = useFieldArray({
        control,
        name: `questions.${idx}.answers`,
    });


    return (
        <div>
            {fields.map((question, answerIdx) => {
                return (
                    <div key={idx} className={'answer'}>
                        <input type={'checkbox'}  {...register(`questions.${idx}.answers.${answerIdx}.isRight`)} />
                        <input
                            type="text"
                            placeholder={'Ответ'}
                            {...register(`questions.${idx}.answers.${answerIdx}.text`)}
                        />
                    </div>
                )
            })}

            <Button onClick={() => append({text: ''})}>
                + answer
            </Button>
        </div>
    )
}
