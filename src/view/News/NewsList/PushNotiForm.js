import { Button, Col, Row, Table, Tag } from 'antd';
import React, { useState } from 'react';
import { BiEdit } from 'react-icons/bi';
import { IoIosAdd } from 'react-icons/io';
import { MdDeleteOutline } from 'react-icons/md';
import PushNotiModal from './PushNotiModal';

export default function PushNotiForm() {
    const [openModal, setOpenModal] = useState(false);

    const showModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Content',
            dataIndex: 'content',
            key: 'content',
        },
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            render: (web) => (
                <Tag color="green" key={web}>
                    <a
                        target="_blank"
                        rel="noreferrer"
                        style={{ textDecoration: 'none' }}
                        href={web}
                    >
                        {web}
                    </a>
                </Tag>
            ),
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
        },
        {
            title: 'Action',
            key: 'action',
            render: (val) => (
                <Row>
                    <Col span={12} style={{ padding: '0 8px' }}>
                        <Button
                            type="primary"
                            size="small"
                            onClick={() => {
                                setOpenModal(true);
                            }}
                        >
                            <BiEdit size={20} />
                        </Button>
                    </Col>
                    <Col span={12} style={{ padding: '0 8px' }}>
                        <Button
                            type="primary"
                            size="small"
                            danger
                            onClick={() => {}}
                        >
                            <MdDeleteOutline size={20} />
                        </Button>
                    </Col>
                </Row>
            ),
        },
    ];

    return (
        <div
            style={{
                width: '95%',
                borderRadius: '25px',
                backgroundColor: '#E8E9EB',
                margin: 'auto',
                boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
            }}
        >
            <Row style={{ padding: 16 }}>
                <Col>
                    <h2 style={{ color: 'black' }}>Push Notification</h2>
                </Col>
                <Col offset={15}>
                    <Button
                        type="primary"
                        size="large"
                        style={{
                            width: 200,
                            backgroundColor: '#531dab',
                        }}
                        onClick={showModal}
                    >
                        Create notification
                    </Button>
                </Col>
            </Row>

            <Table columns={columns} dataSource={[]} rowKey="id" />

            <PushNotiModal
                isOpenModal={openModal}
                closeModal={handleCloseModal}
            />
        </div>
    );
}
