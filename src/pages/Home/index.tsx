import React, { useEffect } from 'react';
import './Home.scss';
import {useSelector} from "react-redux";
import {selectUser} from "../../redux/userSlice";
import {ITest} from "../../interfaces";
import {getUserTests} from "../../core/api/users.service";
import {Breadcrumb, Button} from "antd";
import {TestList} from "../../components/TestList";
const Home = () => {
    const user = useSelector(selectUser);
    const [tests, setTests] = React.useState<ITest[]>([]);

    useEffect(() => {
        if (!user) {
            return
        }

        getUserTests(user?.id).then(response => {
            setTests(response);
        })
    }, [])

    return (
        <div className={"site-content"}>
            <Breadcrumb style={{margin: '16px 0'}}>
                <Breadcrumb.Item>Тесты</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-content">
                <TestList data={tests} onClick={(id: string) => {}} isAdmin={false} />

            </div>
        </div>
    );
};

export default Home
