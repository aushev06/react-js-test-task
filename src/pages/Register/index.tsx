import React from "react";


import "../Auth/Auth.scss";
import {LoginForm} from "../../modules/LoginForm/LoginForm.module";
import {RegisterForm} from "../../modules/RegisterForm/RegisterForm.module";

const Register = () => (
    <section className="auth">
        <div className="auth__content">
            <RegisterForm />
        </div>
    </section>
);

export default Register;
