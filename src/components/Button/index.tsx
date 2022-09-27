import React from "react";
import PropTypes from "prop-types";
import { Button as BaseButton } from "antd";
import classNames from "classnames";

import "./Button.scss";
import {ButtonProps} from "antd/lib/button/button";

type Props = {
    className?: string
}

export const Button: React.FC<Props & ButtonProps> = props => (
    <BaseButton
        {...props}
        className={classNames("button", props.className, {
            "button--large": props.size === "large"
        })}
    />
);
