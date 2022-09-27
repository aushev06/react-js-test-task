import React from "react";
import classNames from "classnames";

import "./Block.scss";

type Props = {
    children: JSX.Element,
    className?: string
}

const Block: React.FC<Props>= ({ children, className }) => (
    <div className={classNames("block", className)}>{children}</div>
);

export default Block;
