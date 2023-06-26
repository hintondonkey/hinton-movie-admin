import { Col, Row, Switch, Table, Tag } from 'antd';
import React, { useState } from 'react';
import LoadingSpin from '../../../common/LoadingSpin';
import MenuNavigator from '../../../components/MenuNavigator';
import './ServiceAccount.css';

const columns = [
    {
        title: 'Index',
        dataIndex: 'index',
        width: 50,
    },
    {
        title: 'Service Name',
        dataIndex: 'serviceName',
        key: 'serviceName',
    },
    {
        title: 'Business Type',
        dataIndex: 'businessType',
        key: 'category',
        width: 150,
    },
    {
        title: 'Active',
        dataIndex: 'active',
        key: 'active',
        width: 200,
        render: (value) => (
            <Switch
                className="switch_status"
                checkedChildren="Active"
                unCheckedChildren="Inactive"
                style={{ width: 100 }}
            />
        ),
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price ',
        render: (val) => <>${val}</>,
    },
];

export default function ServiceAccount() {
    const [loading, setLoading] = useState(false);

    const datas = [
        {
            index: 1,
            businessType: 'NPO',
            serviceName: 'Account Management',
            active: true,
            price: 10,
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
                    ></div>

                    <div
                        style={{
                            backgroundColor: '#F5F5F5',

                            height: '100vh',
                            paddingTop: 24,
                        }}
                    >
                        <Tag
                            color="#1F6C97"
                            style={{
                                display: 'flex',
                                justifyContent: 'space-around',
                                fontSize: 30,
                                padding: 16,
                                width: 300,
                                margin: 'auto',
                            }}
                        >
                            <div>Total:</div>
                            <div>$40.00</div>
                        </Tag>
                        <div
                            style={{ width: '100%', padding: 16, marginTop: 8 }}
                        >
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
