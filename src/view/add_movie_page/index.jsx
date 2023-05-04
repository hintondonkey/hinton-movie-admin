import {
    Button,
    Cascader,
    Col,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Modal,
    Radio,
    Row,
    Select,
    Space,
    Switch,
    TreeSelect,
    Upload,
} from 'antd';

import React from 'react';
import Header from '../../components/Header';
import TextArea from 'antd/es/input/TextArea';
import { RiImageAddLine } from 'react-icons/ri';
import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';

const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

export default function AddMoviePage() {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([]);

    const handleCancel = () => setPreviewOpen(false);
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(
            file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
        );
    };
    const handleChange = ({ fileList: newFileList }) =>
        setFileList(newFileList);

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );

    return (
        <>
            <Col>
                <Header />
                <Form
                    size={'large'}
                    layout="horizontal"
                    style={{
                        width: '100vh',
                        margin: 'auto',
                        padding: 16,
                        backgroundColor: 'grey',
                    }}
                >
                    <Row>
                        <Col className="gutter-row" span={12}>
                            <Form.Item
                                label="Show Date"
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 12 }}
                            >
                                <DatePicker />
                            </Form.Item>
                        </Col>

                        <Col className="gutter-row" span={12}>
                            <Form.Item
                                label="Close Date"
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 12 }}
                            >
                                <DatePicker />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item label="Movie Title" labelCol={{ span: 4 }}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="Summary" labelCol={{ span: 4 }}>
                        <TextArea
                            rows={4}
                            placeholder="Max length is 1000"
                            maxLength={1000}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Push Notification"
                        valuePropName="checked"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 2 }}
                    >
                        <Switch defaultChecked={false} />
                    </Form.Item>
                    <Form.Item label="Image">
                        <Form.Item
                            name="dragger"
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                            noStyle
                        >
                            <Upload
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                listType="picture-card"
                                fileList={fileList}
                                onPreview={handlePreview}
                                onChange={handleChange}
                            >
                                {fileList.length >= 1 ? null : uploadButton}
                            </Upload>
                            <Modal
                                open={previewOpen}
                                title={previewTitle}
                                footer={null}
                                onCancel={handleCancel}
                            >
                                <img
                                    alt="poster movie"
                                    style={{ width: '100%' }}
                                    src={previewImage}
                                />
                            </Modal>
                        </Form.Item>
                    </Form.Item>
                    <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                        <Space>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                            <Button htmlType="reset">reset</Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Col>
        </>
    );
}
