export interface IUser {
    "id": string,
    "role": "ADMIN" | "USER",
    "email": string,
    "firstName": string,
    "lastName": string,
    "deletedAt": Date,
    "createdAt": Date,
    "updatedAt": Date
}

export interface IAnswer {
    id: string;
    text: string;
}

export interface IQuestion {
    text: string;
    id: string;
    answers: IAnswer[]
}

export interface UserAnswer {
    progress: number;
}

export interface ITest {
    id: string;
    name: string;

    questions: IQuestion[]
    testUsers: IUser[];
    userAnswers: UserAnswer[]
}
