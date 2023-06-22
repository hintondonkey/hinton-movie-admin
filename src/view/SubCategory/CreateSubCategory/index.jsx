import { Button, Col, Form, Input, Row, Select } from 'antd';

import LoadingSpin from '../../../common/LoadingSpin';
import MenuNavigator from '../../../components/MenuNavigator';
import { useState } from 'react';

export default function CreateSubCategory() {
    const [loading, setLoading] = useState(false);

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
                        }}
                    >
                        <Form
                            name="create_account_form"
                            layout="vertical"
                            size="large"
                            style={{
                                width: 603,
                                margin: 'auto',
                                backgroundColor: '#FFFFFF',
                                padding: '24px 24px 24px 24px',
                                borderRadius: 15,
                            }}
                        >
                            <Form.Item label="Sub Category Name">
                                <Input />
                            </Form.Item>
                            <Form.Item label="Category">
                                <Select
                                    style={{ textAlign: 'left' }}
                                    options={[
                                        {
                                            value: 'Category1',
                                            label: 'Category1',
                                        },
                                        {
                                            value: 'Category2',
                                            label: 'Category2',
                                        },
                                    ]}
                                />
                            </Form.Item>
                            <Button
                                style={{ width: 200 }}
                                type="primary"
                                size="large"
                            >
                                Create
                            </Button>
                        </Form>
                    </div>
                </Col>
            </Row>
            {loading ? <LoadingSpin /> : <></>}
        </div>
    );
}
