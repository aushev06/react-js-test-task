import {axios} from "../axios";
import {IQuestion, ITest, IUser} from "../../interfaces";
import {IPageResponse} from "./users.service";

export const getAllTests = async (): Promise<IPageResponse<ITest>> => {
    const { data } = await axios.get('/tests?size=1000');

    return data;
}


export const createTests = async (fields: unknown) => {
    const { data } = await axios.post('/tests', fields);

    return data;
}


export const getOneTest = async (id: string): Promise<ITest> => {
    const { data } = await axios.get('/tests/' + id);

    return data;
}


export const assignUsersToTest = async (id: string, userIds: string[]) => {
    const { data } = await axios.post(`/tests/${id}/assign`, {
        userIds
    });

    return data;
}

export const sendAnswers = async (testId: string, questions: IQuestion[]) => {
    const { data } = await axios.post(`/tests/${testId}/save-answers`, {
        questions
    });

    return data;
}
