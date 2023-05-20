import { Button, Col, Row, Table, Tag } from 'antd';
import React, { useState } from 'react';
import { BiEdit } from 'react-icons/bi';
import { IoIosAdd } from 'react-icons/io';
import { MdDeleteOutline } from 'react-icons/md';
import TicketModal from './TicketModal';

export default function TicketForm(props) {
    let { listTicket, setListTicket } = props;

    const [openModal, setOpenModal] = useState(false);
    const [ticketForEdit, setTicketForEdit] = useState(null);

    const showModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleCreateTicket = (item) => {
        const newList = [...listTicket];
        newList.push(item);

        setListTicket(newList);
        setOpenModal(false);
    };

    const handleChangeTicketInfo = (ticket) => {
        setTicketForEdit(ticket);
    };

    const handleEditTicket = (ticket) => {
        let abc = listTicket.filter((item) => item.id === ticket.id);
    };

    const columns = [
        {
            title: 'Date Picker',
            dataIndex: 'datePickerStr',
            key: 'datePickerStr',
        },
        {
            title: 'Time',
            dataIndex: 'timeShowDateStr',
            key: 'timeShowDateStr',
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
                                setTicketForEdit(val);

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
                onSave={handleCreateTicket}
                ticketForEdit={{ ...ticketForEdit }}
                handleChangeTicketInfo={handleChangeTicketInfo}
            />
        </div>
    );
}
