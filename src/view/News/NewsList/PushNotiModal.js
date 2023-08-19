import {
    Button,
    Col,
    DatePicker,
    Form,
    Input,
    Modal,
    Row,
    Select,
    TimePicker,
} from 'antd';
import React from 'react';
import {
    DANGER_COLOR,
    INFO_COLOR,
    SUCCESS_COLOR,
} from '../../../constants/colors';
import dayjs from 'dayjs';
import moment from 'moment';

export default function PushNotiModal(props) {
    let { isOpenModal, closeModal } = props;

    const handleCloseModal = () => {
        closeModal();
    };

    const disabledDate = (current) => {
        return current && current < moment().startOf('day');
    };

    return (
        <Modal
            title="Create New Notification"
            open={isOpenModal}
            onCancel={handleCloseModal}
            width="40%"
            footer={[
                <Row>
                    <Col span={6} offset={10}>
                        <Button
                            key="back"
                            onClick={handleCloseModal}
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
                            style={{ backgroundColor: SUCCESS_COLOR }}
                            onClick={() => {}}
                        >
                            Create
                        </Button>
                    </Col>
                </Row>,
            ]}
        >
            <Form
                name="modalPushNotification"
                style={{ width: '100%' }}
                initialValues={{ remember: true }}
            >
                <Form.Item
                    name="title"
                    label="Title"
                    labelCol={{ span: 6 }}
                    rules={[
                        {
                            required: true,
                            message: 'Please input title',
                        },
                    ]}
                >
                    <Input onChange={(val) => {}} />
                    {/* <DatePicker onChange={(val, valString) => {}} /> */}
                </Form.Item>
                <Form.Item
                    name="content"
                    label="Content"
                    labelCol={{ span: 6 }}
                    rules={[
                        {
                            required: true,
                            message: 'Please input content',
                        },
                    ]}
                >
                    <Input onChange={(val) => {}} />
                </Form.Item>
                <Form.Item
                    name="time_post"
                    label="Time Post"
                    labelCol={{ span: 6 }}
                    rules={[
                        {
                            required: true,
                            message: 'Please input time post',
                        },
                    ]}
                >
                    <DatePicker
                        showTime={{
                            defaultValue: dayjs('00:00:00', 'HH:mm'),
                        }}
                        format="YYYY-MM-DD HH:mm"
                        disabledDate={disabledDate}
                        onChange={(val, valString) => {}}
                    />
                </Form.Item>
                <Form.Item
                    name="status"
                    label="Status"
                    labelCol={{ span: 6 }}
                    rules={[
                        {
                            required: true,
                            message: 'Please input time post',
                        },
                    ]}
                >
                    <Select placeholder="Status" onChange={() => {}} value={1}>
                        <Select.Option key={1} value={1}>
                            Posted
                        </Select.Option>
                        <Select.Option key={2} value={2}>
                            Pending
                        </Select.Option>
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
}
