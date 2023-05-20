import { Button, Col, Row, Table, Tag } from 'antd';
import React, { useState } from 'react';
import { BiEdit } from 'react-icons/bi';
import { IoIosAdd } from 'react-icons/io';
import { MdDeleteOutline } from 'react-icons/md';
import TicketModal from './TicketModal';

export default function TicketForm() {
    const [openModal, setOpenModal] = useState(false);

    const [listTicket, setListTicket] = useState([]);

    const showModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const columns = [
        {
            title: 'Date Picker',
            dataIndex: 'date_picker_str',
            key: 'date_picker_str',
        },
        {
            title: 'Time',
            dataIndex: 'time_show_date_str',
            key: 'time_show_date_str',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Website',
            key: 'website',
            dataIndex: 'website',
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
            key: 'action',
            render: (val) => (
                <Row>
                    <Col span={12} style={{ padding: '0 8px' }}>
                        <Button
                            type="primary"
                            size="small"
                            onClick={() => {
                                console.log('val', val);
                                let {
                                    id,
                                    date_picker,
                                    date_picker_str,
                                    time_show_date,
                                    time_show_date_str,
                                    price,
                                    website,
                                } = val;

                                setOpenModal(true);
                            }}
                        >
                            <BiEdit size={20} />
                        </Button>
                    </Col>
                    <Col span={12} style={{ padding: '0 8px' }}>
                        <Button type="primary" size="small" danger>
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
                    <h2 style={{ color: 'black' }}>Ticket</h2>
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
                        <IoIosAdd size={30} />
                        Create new ticket
                    </Button>
                </Col>
            </Row>

            <Table columns={columns} dataSource={listTicket} rowKey="id" />

            <TicketModal
                isOpenModal={openModal}
                closeModal={handleCloseModal}
            />
        </div>
    );
}
