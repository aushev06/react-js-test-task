import {Select} from 'antd';
import React from 'react';
import {IUser} from "../../../interfaces";

const {Option} = Select;



type Props = {
    users: IUser[];
    disabledUsers: IUser[];
    onChange: (ids: string) => void
}

export const SelectUsers = ({users, disabledUsers, onChange}: Props) => {
    const handleChange = (value: string[]) => {
        onChange(value[value.length - 1]);
    };

    return (
        (
            <>
                <Select
                    mode="multiple"
                    allowClear
                    style={{width: '100%'}}
                    placeholder="Please select"
                    onChange={handleChange}
                >
                    {users.map((item) => {
                        return (
                            <Option key={item.id}>{item.email}</Option>
                        )
                    })}
                </Select>
                <br/>
                <Select
                    mode="multiple"
                    disabled
                    style={{width: '100%'}}
                    placeholder="Please select"
                    defaultValue={disabledUsers.map(user => user.email)}
                    onChange={handleChange}
                >
                    {disabledUsers.map((item) => {
                        return (
                            <Option key={`disabled-${item.id}`}>{item.email}</Option>
                        )
                    })}
                </Select>
            </>
        )
    )
};
