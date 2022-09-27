import React from "react";
import {Skeleton, Card, Breadcrumb, Modal, List, Badge} from 'antd';
import {EditOutlined, DeleteOutlined, ExclamationCircleOutlined, PlusOutlined} from '@ant-design/icons';
import {Link, useNavigate} from "react-router-dom";
import {assignUsersToTest, getOneTest} from "../../../core/api/tests.service";
import {useParams} from "react-router";
import LetterOrAvatar from "../../../components/LetterOrAvatar";
import {ITest, IUser} from "../../../interfaces";
import {SelectUsers} from "./SelectUsers";
import {getUsers} from "../../../core/api/users.service";

const {Meta} = Card;


const {confirm} = Modal;

const statuses = {
    0: {
        text: 'Не выполнено',
        color: 'red'
    },
    1: {
        text: 'Выполнено',
        color: 'green'
    },

    2: {
        text: 'Выполнено',
        color: 'green'
    }
}
export const Test = () => {
    const [test, setTest] = React.useState<ITest>();
    const [users, setUsers] = React.useState<IUser[]>([]);
    const [updater, setUpdater] = React.useState(0);

    const [selectedUsers, setSelectedUsers] = React.useState<string[]>([]);

    const params = useParams();
    const navigate = useNavigate();

    const showDeleteConfirm = (id: string) => {
        confirm({
            title: 'Удаление',
            icon: <ExclamationCircleOutlined/>,
            content: 'Вы действительно хотите удалить данный тест?',
            okText: 'Да',
            okType: 'danger',
            cancelText: 'Отменить',
            onOk() {
                // TODO: Сделать удаление
            },
            onCancel() {

            },
        });
    }


    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        setLoading(true)
        getOneTest(params.id as string)
            .then(response => {
                setTest(response);
            })
            .catch(error => {
                console.log(error)
                navigate('/404')
            })
            .finally(() => {
                setLoading(false)
            })

       if (!users.length) {
           getUsers().then((response) => {
               setUsers(response.content);
           })
       }

    }, [params, updater])

    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = async () => {
        setIsModalOpen(false);
        await assignUsersToTest(params.id as string, selectedUsers)
        setUpdater(updater + 1);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };


    const selectUser = (id: string) => {
        setSelectedUsers([...selectedUsers, id]);
    }

    return (
        <div>
            <Breadcrumb style={{margin: '16px 0'}}>
                <Breadcrumb.Item>
                    <Link to={"/tests"}>Тесты</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>{test?.name}</Breadcrumb.Item>
            </Breadcrumb>


            <Card
                style={{width: '100%', marginTop: 16}}
                actions={[
                    <PlusOutlined onClick={() => showModal()} key="delete"/>,
                ]}
            >
                <Skeleton loading={loading} avatar active>
                    <Meta
                        avatar={
                            <LetterOrAvatar letter={''} name={test?.name || ''}/>
                        }
                        title={test?.name}
                    />
                </Skeleton>
            </Card>

            <div className={"site-layout-content"} style={{minHeight: 'auto'}}>
                {test?.testUsers.map((item, idx) => {
                    return (
                        <List.Item
                            className={'cursor-pointer'}
                            onClick={() => navigate('/users/' + item.id)}
                            key={item.id}
                        >
                            <Skeleton avatar title={false} loading={false} active>
                                <List.Item.Meta
                                    avatar={
                                        <LetterOrAvatar letter={"#" + (idx + 1)} name={item.firstName}/>
                                    }
                                    title={<Link to={`/users/${item.id}`}>{item.firstName}</Link>}
                                />

                            </Skeleton>
                        </List.Item>
                    )
                })}
            </div>


            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <SelectUsers
                    onChange={selectUser}
                    users={users.filter((user) => !test?.testUsers.find(testUser => user.id === testUser.id))}
                    disabledUsers={test?.testUsers || []} />
            </Modal>

        </div>

    )
}
