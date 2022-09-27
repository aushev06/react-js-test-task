import React from 'react'
import {Layout, Result, Button} from 'antd';
import {Sidebar} from "../SideBar";

const {Content, Footer} = Layout

type Props = {
    children: React.ReactNode;
}

export const Layouts = (props: Props) => {
    return (
        <Layout className="layout" style={{minHeight: '100vh'}}>
            <Sidebar />

            <Layout>
                <Content style={{padding: '0 50px'}}>
                    {props.children}
                </Content>
            </Layout>
        </Layout>
    )
}
