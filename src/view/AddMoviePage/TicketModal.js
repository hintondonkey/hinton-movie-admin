import {
    Button,
    Col,
    DatePicker,
    Form,
    Input,
    Modal,
    Row,
    TimePicker,
} from 'antd';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { DANGER_COLOR, SUCCESS_COLOR } from '../../constants/colors';

export default function TicketModal(props) {
    const [loading, setLoading] = useState(false);
    const [date_picker, setdate_picker] = useState('');
    const [date_picker_str, setdate_picker_str] = useState('');
    const [time_show_date, settime_show_date] = useState('');
    const [time_show_date_str, settime_show_date_str] = useState('');
    const [price, setprice] = useState('');
    const [website, setwebsite] = useState('');

    const [formTicket] = Form.useForm();

    let { isOpenModal, closeModal } = props;

    return (
        <Modal
            title="Create New Ticket"
            open={isOpenModal}
            onCancel={closeModal}
            width="40%"
            footer={[
                <Row>
                    <Col span={6} offset={10}>
                        <Button
                            key="back"
                            onClick={closeModal}
                            style={{
                                backgroundColor: DANGER_COLOR,
                                color: 'white',
                            }}
                        >
                            Close
                        </Button>
                    </Col>

                    <Col span={6} offset={2}>
                        <Button
                            key="submit"
                            type="primary"
                            loading={loading}
                            onClick={() => {}}
                            style={{ backgroundColor: SUCCESS_COLOR }}
                        >
                            Save
                        </Button>
                    </Col>
                </Row>,
            ]}
        >
            <Form
                name="modalTicket"
                form={formTicket}
                style={{ width: '100%' }}
            >
                <Form.Item
                    name="datePicker"
                    label="Date Picker"
                    labelCol={{ span: 6 }}
                    rules={[
                        {
                            required: true,
                            message: 'Please input movie title',
                        },
                    ]}
                >
                    <DatePicker
                        value={date_picker}
                        onChange={(val, valString) => {
                            setdate_picker(val);
                            setdate_picker_str(valString);
                        }}
                    />
                </Form.Item>
                <Form.Item
                    name="time"
                    label="Time"
                    labelCol={{ span: 6 }}
                    rules={[
                        {
                            required: true,
                            message: 'Please input time',
                        },
                    ]}
                >
                    <TimePicker
                        value={time_show_date}
                        defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')}
                        format="HH:mm"
                        onChange={(val, valString) => {
                            settime_show_date(val);
                            settime_show_date_str(valString);
                        }}
                    />
                </Form.Item>
                <Form.Item
                    name="price"
                    label="Price"
                    labelCol={{ span: 6 }}
                    rules={[
                        {
                            required: true,
                            message: 'Please input price',
                        },
                    ]}
                >
                    <Input
                        value={price}
                        onChange={(val) => {
                            setprice(val);
                        }}
                    />
                </Form.Item>
                <Form.Item
                    name="linkToTicket"
                    label="Link To Ticket"
                    labelCol={{ span: 6 }}
                    rules={[
                        {
                            required: true,
                            message: 'Please input link to ticket',
                        },
                    ]}
                >
                    <Input
                        value={website}
                        onChange={(val) => {
                            setwebsite(val);
                        }}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
}
