import { Button, Col, Form, Input, Row, Space, Table } from 'antd';

import LoadingSpin from '../../../common/LoadingSpin';
import MenuNavigator from '../../../components/MenuNavigator';
import { useState } from 'react';

const columns = [
    {
        title: 'Other',
        dataIndex: 'id',
    },
    {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
    },
    {
        title: 'Total Event',
        dataIndex: 'totalEvent',
        key: 'totalEvent',
    },
    {
        title: 'Action',

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
                    Create Event
                </Button>
            </Space>
        ),
    },
];

export default function ListCategory() {
    const [loading, setLoading] = useState(false);

    const datas = [
        {
            id: 1,
            category: 'Dance',
            totalEvent: 10,
        },
        {
            id: 1,
            category: 'Dance',
            totalEvent: 10,
        },
        {
            id: 1,
            category: 'Dance',
            totalEvent: 10,
        },
    ];

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
                        <div></div>
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
