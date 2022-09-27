import React from 'react';
import {List, Skeleton, Breadcrumb, Divider, Button, Empty} from 'antd';
import {Link, useNavigate} from "react-router-dom";

import './Users.scss';
import LetterOrAvatar from "../../../components/LetterOrAvatar";
import {cancelUsersRequest, getUsers} from "../../../core/api/users.service";
import {useParams} from "react-router";

const mockData = Array(5)
    .fill(0)
    .map((item, key) => ({
        name: '',
        letter: '',
        id: `${key}`,
        loading: true,
    }))

export const Users = () => {
    const navigate = useNavigate();
    const params = useParams();


    const [data, setData] = React.useState([{
        key: '',
        data: mockData
    }]);
    React.useEffect(() => {
        getUsers()
            .then((response) => {
                setData([
                    {key: 'P', data: response.content.map((user) => ({name: user.firstName, id: user.id, letter: '', loading: false}))}
                ]);
            })
            .catch(error => {

            })
        return () => {
            cancelUsersRequest();
        }
    }, [])

    const getOrders = () => {


    }

    return (
        <div className={"site-content"}>
            <Breadcrumb style={{margin: '16px 0'}}>
                <Breadcrumb.Item>Пользователи</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-content">
                <div className={"users"}>
                    <div>
                        <Button onClick={() => navigate('/users/create')}>
                            Добавить
                        </Button>
                    </div>
                </div>
                {data.map((item, key) => {
                    return (
                        <div key={key}>
                            <Divider orientation={"left"}>{item.key}</Divider>
                            {item.data.map(dataItem => {
                                return (
                                    <List.Item
                                        className={'cursor-pointer'}
                                        key={dataItem.id}
                                        onClick={() => navigate(`/users/${dataItem.id}`)}
                                        actions={[<Link onClick={(e) => e.stopPropagation()}
                                                        to={`/users/${dataItem.id}/edit`}
                                                        key="list-loadmore-edit">Изменить</Link>]}
                                    >
                                        <Skeleton avatar title={false} loading={dataItem.loading} active>
                                            <List.Item.Meta
                                                avatar={
                                                    <LetterOrAvatar letter={dataItem.letter} name={dataItem.name}/>
                                                }
                                                title={<Link to={`/users/${dataItem.id}`}>{dataItem.name}</Link>}
                                                description=""
                                            />

                                        </Skeleton>
                                    </List.Item>
                                )
                            })}
                        </div>
                    )
                })}

                {data.length === 0 && <Empty
                    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                    imageStyle={{
                        height: 60,
                    }}
                    description={
                        <span>
                         Нет данных
                         </span>
                    }
                >
                    <Button onClick={() => navigate('/users/create')} type="primary">Добавить</Button>
                </Empty>}


            </div>
        </div>
    )
}
