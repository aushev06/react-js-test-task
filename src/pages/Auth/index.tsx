import React from "react";


import "./Auth.scss";
import {LoginForm} from "../../modules/LoginForm/LoginForm.module";

const Auth = () => (
    <section className="auth">
        <div className="auth__content">
            <LoginForm />
        </div>
    </section>
);

export default Auth;
