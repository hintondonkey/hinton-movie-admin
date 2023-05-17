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

    const [formTicket] = Form.useForm();

    let { openModal, closeModal } = props;

    return (
        <Modal
            title="Create New Ticket"
            open={openModal}
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
                    <DatePicker onChange={(val, valString) => {}} />
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
                        defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')}
                        format="HH:mm"
                        onChange={(val, valString) => {}}
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
                    <Input onChange={(val) => {}} />
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
                    <Input onChange={(val) => {}} />
                </Form.Item>
            </Form>
        </Modal>
    );
}
