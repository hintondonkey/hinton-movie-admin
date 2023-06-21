import { Button, Col, Row, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import LoadingSpin from '../../../common/LoadingSpin';
import MenuNavigator from '../../../components/MenuNavigator';
import { useDispatch, useSelector } from 'react-redux';
import { getAcount } from '../../../services/auth/authSlice';
import Link from 'antd/es/typography/Link';
import { BiEdit } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { AiFillEdit } from 'react-icons/ai';

const columns = [
    {
        title: 'SNo',
        dataIndex: 'key',
    },
    {
        title: 'First Name',
        dataIndex: 'firstName',
        key: 'firstName',
    },
    {
        title: 'Last Name',
        dataIndex: 'lastName',
        key: 'lastName',
    },
    {
        title: 'ID/Email',
        dataIndex: 'email',
        key: 'email',
        width: 400,
    },
    {
        title: 'Role',
        dataIndex: 'role',
        key: 'role',
    },
    {
        title: 'Actions',
        dataIndex: 'Actions',
    },
];

export default function OverviewAccount() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        dispatch(getAcount());
    }, []);
    // const datas = [
    //     {
    //         firstName: 'Stephen',
    //         lastName: 'Dinh',
    //         email: 'Stenphen.dinh01@gmail.com',
    //         role: 'Supervisor',
    //     },
    //     {
    //         firstName: 'Stephen',
    //         lastName: 'Dinh',
    //         email: 'Stenphen.dinh0111@gmail.com',
    //         role: 'Supervisor',
    //     },
    //     {
    //         firstName: 'Stephen',
    //         lastName: 'Dinh',
    //         email: 'Stenphen.dinh0112321@gmail.com',
    //         role: 'Supervisor',
    //     },
    // ];
    const handleUpdates = (id) => {
        navigate(`/createAccount/${id}`);
    };
    const allUsers = useSelector((state) => state?.auth?.allUsers);

    const datas = [];
    allUsers &&
        allUsers.length > 0 &&
        allUsers.forEach((i) => {
            datas.push({
                firstName: i.user.first_name,
                lastName: i.user.last_name,
                email: i.user.email,
                role: i.account_type.name,
                Actions: (
                    <>
                        <button
                            className="ms-3 fs-3 text-danger bg-transparent border-0"
                            onClick={() => handleUpdates(i.id)}
                        >
                            <AiFillEdit />
                        </button>
                    </>
                ),
            });
        });

    const _buildHeader = () => {
        <div></div>;
    };

    return (
        <div style={{ height: '100vh' }}>
            <Row style={{ height: '100%' }}>
                <Col span={4}>
                    <MenuNavigator />
                </Col>
                <Col flex={1}>
                    <div
                        style={{
                            padding: '24px',
                            backgroundColor: '#1F6C97',
                        }}
                    >
                        {_buildHeader()}
                    </div>
                    <div
                        style={{
                            backgroundColor: '#F5F5F5',
                            display: 'flex',
                            height: '100vh',
                            paddingTop: 24,
                        }}
                    >
                        <div style={{ width: '100%', padding: 16 }}>
                            <Table
                                style={{
                                    boxShadow:
                                        'rgba(149, 157, 165, 0.2) 0px 8px 24px',
                                    borderRadius: 20,
                                }}
                                columns={columns}
                                dataSource={datas}
                            />
                        </div>
                    </div>
                </Col>
            </Row>
            {loading ? <LoadingSpin /> : <></>}
        </div>
    );
}
