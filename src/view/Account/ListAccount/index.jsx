import { Button, Col, Row, Space, Table } from 'antd';
import React, { useState } from 'react';
import LoadingSpin from '../../../common/LoadingSpin';
import MenuNavigator from '../../../components/MenuNavigator';

export default function OverviewAccount() {
    const [loading, setLoading] = useState(false);

    const datas = [
        {
            firstName: 'Stephen',
            lastName: 'Dinh',
            email: 'Stenphen.dinh01@gmail.com',
            role: 'Supervisor',
        },
        {
            firstName: 'Stephen',
            lastName: 'Dinh',
            email: 'Stenphen.dinh0111@gmail.com',
            role: 'Supervisor',
        },
        {
            firstName: 'Stephen',
            lastName: 'Dinh',
            email: 'Stenphen.dinh0112321@gmail.com',
            role: 'Supervisor',
        },
    ];

    const columns = [
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
            key: 'actions',
            render: (item) => (
                <Space direction="horizontal">
                    <Button type="primary">Edit</Button>
                    <Button type="primary" danger>
                        Delete
                    </Button>
                    <Button
                        type="primary"
                        style={{
                            backgroundColor: '#5200FF',
                            color: 'white',
                        }}
                    >
                        Inside
                    </Button>
                </Space>
            ),
        },
    ];

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
