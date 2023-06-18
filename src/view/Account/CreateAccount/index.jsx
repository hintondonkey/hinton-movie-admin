import React, { useState } from 'react';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import MenuNavigator from '../../../components/MenuNavigator';
import LoadingSpin from '../../../common/LoadingSpin';

export default function CreateAccount() {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [disableButton, setDisableButton] = useState(true);

    const handleEnableButton = () => {
        form.validateFields()
            .then((val) => {
                setDisableButton(false);
            })
            .catch((error) => {
                setDisableButton(true);
                console.log('error', error);
            });
    };

    const _buildHeader = () => {
        <div></div>;
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
                        {_buildHeader()}
                    </div>
                    <div
                        style={{
                            backgroundColor: '#F5F5F5',
                            display: 'flex',
                            height: '100vh',
                        }}
                    >
                        <Form
                            form={form}
                            name="create_account_form"
                            layout="horizontal"
                            size="large"
                            style={{
                                width: 603,
                                margin: 'auto',
                                backgroundColor: '#FFFFFF',
                                padding: '48px 24px 24px 24px',
                                borderRadius: 15,
                            }}
                        >
                            <Form.Item
                                name="first_name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input first name',
                                    },
                                ]}
                            >
                                <Input
                                    placeholder="First Name"
                                    allowClear
                                    onChange={(val) => {
                                        handleEnableButton();
                                    }}
                                />
                            </Form.Item>
                            <Form.Item
                                name="last_name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input last name',
                                    },
                                ]}
                            >
                                <Input
                                    placeholder="Last Name"
                                    allowClear
                                    onChange={(val) => {
                                        handleEnableButton();
                                    }}
                                />
                            </Form.Item>
                            <Form.Item
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input email',
                                    },
                                    {
                                        type: 'email',
                                        message:
                                            'The input is not valid E-mail !!!',
                                    },
                                ]}
                            >
                                <Input
                                    placeholder="ID(Email)"
                                    allowClear
                                    onChange={(val) => {
                                        handleEnableButton();
                                    }}
                                />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input password',
                                    },
                                ]}
                            >
                                <Input.Password
                                    placeholder="Password"
                                    onChange={(val) => {
                                        handleEnableButton();
                                    }}
                                />
                            </Form.Item>
                            <Form.Item
                                name="re_password"
                                hasFeedback
                                dependencies={['password']}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input Re-password',
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (
                                                !value ||
                                                getFieldValue('password') ===
                                                    value
                                            ) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(
                                                new Error(
                                                    'The new password that you entered do not match!'
                                                )
                                            );
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password
                                    placeholder="Re-password"
                                    onChange={(val) => {
                                        handleEnableButton();
                                    }}
                                />
                            </Form.Item>

                            <Form.Item
                                name="roles"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input Role',
                                    },
                                ]}
                            >
                                <Select
                                    placeholder="Role"
                                    onChange={(val) => {
                                        handleEnableButton();
                                    }}
                                >
                                    <Select.Option value="editor">
                                        Editor
                                    </Select.Option>
                                    <Select.Option value="supervisor">
                                        Supervisor
                                    </Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    size="large"
                                    type="primary"
                                    disabled={disableButton}
                                    style={{ width: 200 }}
                                >
                                    Create
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Col>
            </Row>
            {loading ? <LoadingSpin /> : <></>}
        </div>
    );
}
