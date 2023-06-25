import { Button, Col, Form, Input, Row, Space, Table } from 'antd';

import LoadingSpin from '../../../common/LoadingSpin';
import MenuNavigator from '../../../components/MenuNavigator';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { listCategory } from '../../../services/category/categorySlice';

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
        dataIndex: 'Action',

        // render: (item) => (
        //     <Space direction="horizontal">
        //         <Button type="primary">Edit</Button>
        //         <Button type="primary" danger>
        //             Delete
        //         </Button>
        //         <Button
        //             type="primary"
        //             style={{
        //                 backgroundColor: '#5200FF',
        //                 color: 'white',
        //             }}
        //         >
        //             Create Event
        //         </Button>
        //     </Space>
        // ),
    },
];

export default function ListCategory() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [open, setOpen] = useState(false);
    const [categoryId, setCategoryId] = useState('');
    const showModal = (e) => {
        setOpen(true);
        setCategoryId(e);
    };

    const hideModal = () => {
        setOpen(false);
    };

    useEffect(() => {
        dispatch(listCategory());
    }, []);

    const allCategories = useSelector((state) => state?.category?.category);
    const handleUpdates = (id) => {
        navigate(`/createCategory/${id}`);
    };

    const datas = [];

    allCategories &&
        allCategories.length > 0 &&
        allCategories.forEach((i, j) => {
            datas.push({
                id: j + 1,
                category: i.name,
                totalEvent: i.total_event,
                Action: (
                    <Space direction="horizontal">
                        <Button
                            type="primary"
                            onClick={() => handleUpdates(i.id)}
                        >
                            Edit
                        </Button>
                        <Button
                            type="primary"
                            danger
                            onClick={() => showModal(i.id)}
                        >
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
            });
        });

    const deleteAccount = (e) => {
        // dispatch(deleteAccountId(e));
        // setOpen(false);
        // setTimeout(() => {
        //     dispatch(getAcount());
        // }, 100);
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
