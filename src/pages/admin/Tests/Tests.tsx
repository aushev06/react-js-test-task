import {Breadcrumb, Button, Divider, Empty, List, Skeleton} from "antd";
import {Link, useNavigate} from "react-router-dom";
import LetterOrAvatar from "../../../components/LetterOrAvatar";
import React from "react";
import {IPageResponse} from "../../../core/api/users.service";
import {ITest} from "../../../interfaces";
import {getAllTests} from "../../../core/api/tests.service";
import './Tests.scss';
import {TestList} from "../../../components/TestList";

export const Tests = () => {
    const navigate = useNavigate();
    const [data, setData] = React.useState<ITest[]>([]);

    React.useEffect(() => {
        getAllTests().then(response => {
            setData(response.content);
        })
    }, [])

    return (
        <div className={"site-content"}>
            <Breadcrumb style={{margin: '16px 0'}}>
                <Breadcrumb.Item>Тесты</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-content">
                <div className={"tests"}>
                    <div>
                        <Button onClick={() => navigate('/tests/create')}>
                            Добавить
                        </Button>
                    </div>
                </div>

                <TestList data={data} onClick={(id: string) => {}} isAdmin={true} />


            </div>
        </div>
    )
}
