import React from 'react';
import {Avatar} from "antd";

import './LetterOrAvatar.scss';
import getAvatarColor from "../../helpers/getAvatarColor";


type Props = {
    url?: string;
    letter: string;
    name: string;
}
const LetterOrAvatar = ({url, letter, name}: Props) => {
    if (url) {
        return <Avatar className={"avatar"} src={url}/>
    }

    const bgColor = getAvatarColor(name || letter);

    return (
        <div className={"avatar"} style={{backgroundColor: `${bgColor.background}`}}>
            <div className={"avatar__letter"} style={{color: bgColor.color}}>
                {letter}
            </div>
        </div>
    )

}

export default LetterOrAvatar;
