// import React from "react";
// import {clientApi} from "../../core/api";
// import {Skeleton, Card, Breadcrumb, Modal, List, Badge} from 'antd';
// import {EditOutlined, DeleteOutlined, ExclamationCircleOutlined} from '@ant-design/icons';
// import {Link, useNavigate} from "react-router-dom";
// import LetterOrAvatar from "../../../components/LetterOrAvatar";
// import {useParams} from "react-router";
//
// const {Meta} = Card;
//
//
// const {confirm} = Modal;
//
// const statuses = {
//     0: {
//         text: 'Не выполнено',
//         color: 'red'
//     },
//     1: {
//         text: 'Выполнено',
//         color: 'green'
//     },
//
//     2: {
//         text: 'Выполнено',
//         color: 'green'
//     }
// }
// const Client = (props) => {
//     const [client, setClient] = React.useState({
//         name: ''
//     });
//
//     const navigate = useNavigate();
//     const params = useParams();
//
//     const showDeleteConfirm = (id: string) => {
//         confirm({
//             title: 'Удаление',
//             icon: <ExclamationCircleOutlined/>,
//             content: 'Вы действительно хотите удалить клиента?',
//             okText: 'Да',
//             okType: 'danger',
//             cancelText: 'Отменить',
//             onOk() {
//                 clientApi.delete(id).then(response => {
//                     props.history.replace('/clients');
//                 })
//             },
//             onCancel() {
//
//             },
//         });
//     }
//
//
//     const [loading, setLoading] = React.useState(false);
//
//     // React.useEffect(() => {
//     //     setLoading(true)
//     //     clientApi.show(props.match.params.id)
//     //         .then(response => {
//     //
//     //             if (null === response.data.client) {
//     //                 props.history.push('/404')
//     //             }
//     //
//     //             setClient(response.data.client);
//     //         })
//     //         .catch(error => {
//     //             console.log(error)
//     //             props.history.push('/404')
//     //         })
//     //         .finally(() => {
//     //             setLoading(false)
//     //         })
//     //
//     // }, [props.match.params.id])
//
//
//     return (
//         <div>
//             <Breadcrumb style={{margin: '16px 0'}}>
//                 <Breadcrumb.Item>
//                     <Link to={"/clients"}>Клиенты</Link>
//                 </Breadcrumb.Item>
//                 <Breadcrumb.Item>{client.name}</Breadcrumb.Item>
//             </Breadcrumb>
//
//
//             <Card
//                 style={{width: '100%', marginTop: 16}}
//                 actions={[
//                     <EditOutlined key="edit"
//                                   onClick={() => props.history.push(`/clients/${props.match.params.id}/edit`, {
//                                       client: client
//                                   })}/>,
//                     <DeleteOutlined onClick={() => showDeleteConfirm(props.match.params.id)} key="delete"/>,
//                 ]}
//             >
//                 <Skeleton loading={loading} avatar active>
//                     <Meta
//                         avatar={
//                             <LetterOrAvatar letter={client?.letter || ''} name={client.name || ''}/>
//                         }
//                         title={client.name}
//                     />
//                 </Skeleton>
//             </Card>
//
//             <div className={"site-layout-content"} style={{minHeight: 'auto'}}>
//                 {client && client.orders &&  client?.orders.map(orderItem => {
//                     return (
//                         <List.Item
//                             className={'cursor-pointer'}
//                             onClick={() => props.history.push('/orders/' + orderItem.id)}
//                             key={orderItem.id}
//                         >
//                             <Skeleton avatar title={false} loading={orderItem.loading} active>
//                                 <List.Item.Meta
//                                     avatar={
//                                         <LetterOrAvatar letter={"#" + orderItem.id} name={orderItem.name}/>
//                                     }
//                                     title={<Link to={`/orders/${orderItem.id}`}>#{orderItem.id} {orderItem.name}</Link>}
//                                     description={<Badge color={statuses[orderItem.status].color}
//                                                         text={statuses[orderItem.status].text}/>}
//                                 />
//
//                             </Skeleton>
//                         </List.Item>
//                     )
//                 })}
//             </div>
//
//
//         </div>
//
//     )
// }
//
// export default Client;

const Client = () => {
    return (
        <div></div>
    )
}


export default Client;
