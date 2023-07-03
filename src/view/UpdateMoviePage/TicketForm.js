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
        let price = 0.0;
        try {
            price = parseFloat(item.price);
        } catch (error) {
            console.log('Parse String to float', error);
            price = 0.0;
        }

        let newTicket = {
            id: item.id,
            date_picker: item.datePickerStr,
            time_show_date: item.timeShowDateStr,
            price: price,
            website: item.website,
        };

        const newList = [...listTicket];
        newList.push(newTicket);

        setListTicket(newList);
    };

    const handleChangeTicketForEdit = (ticket) => {
        setTicketForEdit(ticket);
    };

    const handleEditTicket = (ticket) => {
        let newList = listTicket.map((item) => {
            if (item.id === ticket.id) {
                let price = 0.0;
                try {
                    price = parseFloat(ticket.price);
                } catch (error) {
                    console.log('Parse String to float', error);
                    price = 0.0;
                }

                item.date_picker = ticket.datePickerStr;
                item.time_show_date = ticket.timeShowDateStr;
                item.price = price;
                item.website = ticket.website;
            }
            return item;
        });

        setListTicket(newList);
    };

    const handleDeleteTicket = (id) => {
        console.log('index', getIndex(id));
        listTicket.splice(getIndex(id), 1);

        setListTicket([...listTicket]);
    };

    const getIndex = (id) => {
        return listTicket.findIndex((item) => item.key === id);
    };

    const columns = [
        {
            title: 'Date Picker',
            dataIndex: 'date_picker',
            key: 'date_picker',
        },
        {
            title: 'Time',
            dataIndex: 'time_show_date',
            key: 'time_show_date',
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
                                setTicketForEdit(val);

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
                            onClick={() => handleDeleteTicket(val.key)}
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

            <Table columns={columns} dataSource={listTicket} />

            <TicketModal
                isOpenModal={openModal}
                closeModal={handleCloseModal}
                onSave={handleCreateTicket}
                ticketForEdit={ticketForEdit}
                handleChangeTicketForEdit={handleChangeTicketForEdit}
                handleEditTicket={handleEditTicket}
            />
        </div>
    );
}
