import React, { useState } from 'react';
import {
    Button,
    Col,
    DatePicker,
    Form,
    Input,
    Modal,
    Row,
    Switch,
    Table,
    Tag,
    TimePicker,
    Upload,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { PlusOutlined } from '@ant-design/icons';

const normFile = (e) => {
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

export default function MovieForm() {
    const [form] = Form.useForm();

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([]);
    const [movie, setMovie] = useState({
        title: '',
        description: '',
        show_date: '',
        time_show_date: '',
        close_date: '',
        time_close_date: '',
        active: false,
        titleNoti: '',
        summaryNoti: '',
    });

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

    const handleClosePreview = () => {
        setPreviewOpen(false);
    };

    return (
        <div
            style={{
                width: '80%',
                padding: '24px 24px 24px 24px',
                borderRadius: '25px',
                backgroundColor: '#E8E9EB',
                margin: 'auto',
                boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                marginBottom: 24,
            }}
        >
            <Form
                form={form}
                size={'large'}
                layout="horizontal"
                name="movieForm"
            >
                <Form.Item
                    name="movie_title"
                    label="Movie Title"
                    labelCol={{ span: 3 }}
                    rules={[
                        {
                            required: true,
                            message: 'Please input movie title',
                        },
                    ]}
                >
                    <Input
                        onChange={(val) =>
                            setMovie({ ...movie, title: val.target.value })
                        }
                        value={movie.title}
                    />
                </Form.Item>

                <Form.Item
                    name="summary"
                    label="Summary"
                    labelCol={{ span: 3 }}
                    rules={[
                        {
                            required: true,
                            message: 'Please input summary',
                        },
                    ]}
                >
                    <TextArea
                        rows={4}
                        placeholder="Max length is 1000"
                        maxLength={1000}
                        onChange={(val) =>
                            setMovie({
                                ...movie,
                                description: val.target.value,
                            })
                        }
                        value={movie.description}
                    />
                </Form.Item>
                <Row>
                    <Col className="gutter-row" span={12}>
                        <Form.Item
                            name="show_date"
                            label="Show Date"
                            labelCol={{ span: 12 }}
                            wrapperCol={{ span: 11 }}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please choose show date',
                                },
                            ]}
                        >
                            <DatePicker
                                showTime
                                format="YYYY-MM-DD HH:mm"
                                onChange={(val, valString) => {
                                    setMovie({
                                        ...movie,
                                        show_date: valString.split(' ')[0],
                                        time_show_date: valString.split(' ')[1],
                                    });
                                }}
                            />
                        </Form.Item>
                    </Col>

                    <Col className="gutter-row" span={12}>
                        <Form.Item
                            name="close_date"
                            label="Close Date"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 11 }}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please choose close date',
                                },
                            ]}
                        >
                            <DatePicker
                                showTime
                                format="YYYY-MM-DD HH:mm"
                                onChange={(val, valString) => {
                                    setMovie({
                                        ...movie,
                                        close_date: valString.split(' ')[0],
                                        time_close_date:
                                            valString.split(' ')[1],
                                    });
                                }}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item
                    label="Push Notification"
                    valuePropName="checked"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 1 }}
                >
                    <Switch
                        defaultChecked={false}
                        onChange={(val) => {
                            setMovie({ ...movie, active: val });
                        }}
                    />
                </Form.Item>
                {movie.active ? (
                    <>
                        {' '}
                        <Form.Item
                            name="notification_title"
                            label="Notification Title"
                            labelCol={{ span: 6 }}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input notification title',
                                },
                            ]}
                        >
                            <Input
                                onChange={(val) =>
                                    setMovie({
                                        ...movie,
                                        titleNoti: val.target.value,
                                    })
                                }
                                value={movie.titleNoti}
                            />
                        </Form.Item>
                        <Form.Item
                            name="notification_summary"
                            label="Notification Summary"
                            labelCol={{ span: 6 }}
                            rules={[
                                {
                                    required: true,
                                    message:
                                        'Please input notification summary',
                                },
                            ]}
                        >
                            <TextArea
                                rows={4}
                                placeholder="Max length is 1000"
                                maxLength={1000}
                                onChange={(val) =>
                                    setMovie({
                                        ...movie,
                                        summaryNoti: val.target.value,
                                    })
                                }
                                value={movie.summaryNoti}
                            />
                        </Form.Item>
                    </>
                ) : (
                    <></>
                )}

                <Form.Item
                    // name="image"
                    label="Image"
                    labelCol={{ span: 6 }}
                    // rules={[
                    //     {
                    //         required: true,
                    //         message: 'Please upload image',
                    //     },
                    // ]}
                >
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
                            onCancel={handleClosePreview}
                        >
                            <img
                                alt="poster movie"
                                style={{ width: '100%' }}
                                src={previewImage}
                            />
                        </Modal>
                    </Form.Item>
                </Form.Item>
            </Form>
        </div>
    );
}

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
