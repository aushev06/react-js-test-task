import {Button, Empty, List, Skeleton} from "antd";
import {Link, useNavigate} from "react-router-dom";
import LetterOrAvatar from "../LetterOrAvatar";
import React from "react";
import {ITest} from "../../interfaces";


type Props = {
    data: ITest[];
    onClick: (id: string) => void;
    isAdmin: boolean;
}
export const TestList = ({ data, isAdmin, onClick }:Props) => {
    const navigate = useNavigate();

    const action = {
        false: (id: string) => {
            return  <Link onClick={(e) => e.stopPropagation()}
                          to={`/tests/${id}/run`}
                          key="list-loadmore-edit">Посмотреть</Link>
        },

        true: (id: string) => {
            return  <Link onClick={(e) => e.stopPropagation()}
                          to={`/tests/${id}`}
                          key="list-loadmore-edit">Посмотреть</Link>
        }
    }

    return (
        <div>
            {data.map((dataItem) => {
                return (
                    <List.Item
                        className={'cursor-pointer'}
                        key={dataItem.id}
                        onClick={() => onClick(dataItem.id)}
                        actions={[action[`${isAdmin}`](dataItem.id)]}
                    >
                        <Skeleton avatar title={false} loading={!dataItem.id?.length} active>
                            <List.Item.Meta
                                avatar={
                                    <LetterOrAvatar letter={!dataItem?.userAnswers ? `${dataItem.testUsers.length}` : `${dataItem?.userAnswers[dataItem.userAnswers.length - 1]?.progress || '0'}`} name={dataItem.name as string}/>
                                }
                                title={<Link to={`/tests/${dataItem.id}`}>{dataItem.name}</Link>}
                                description=""
                            />

                        </Skeleton>
                    </List.Item>
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
                {isAdmin && <Button onClick={() => navigate('/tests/create')} type="primary">Добавить</Button>}
            </Empty>}
        </div>
    )
}
