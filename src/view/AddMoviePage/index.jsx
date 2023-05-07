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

import { PlusOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import React, { useState } from 'react';
import MenuNavigator from '../../components/MenuNavigator';
import './styles.css';

import dayjs from 'dayjs';
import { BiEdit } from 'react-icons/bi';
import { FiSave } from 'react-icons/fi';
import { IoIosAdd } from 'react-icons/io';
import { MdDeleteOutline } from 'react-icons/md';
import '../../constants/colors';
import { DANGER_COLOR, SUCCESS_COLOR } from '../../constants/colors';
import '../../models/edit_movie_request';
import { EditMovieRequest } from '../../models/edit_movie_request';
import { createMovie } from '../../services/UserService';
import uuid from 'react-uuid';

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
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [listTicket, setListTicket] = useState([]);
    const [form] = Form.useForm();
    const [formTicket] = Form.useForm();
    const [ticket, setTicket] = useState({
        id: '',
        date_picker: '',
        date_picker_str: '',
        time_show_date: '',
        time_show_date_str: '',
        price: '',
        website: '',
    });
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

    const showModal = () => {
        setOpen(true);
    };

    const handleCancelTicket = () => {
        setOpen(false);

        setTicket({
            id: '',
            date_picker: '',
            date_picker_str: '',
            time_show_date: '',
            time_show_date_str: '',
            price: '',
            website: '',
        });
        console.log('ticket cancel', ticket);
    };

    // const handleCancel = () => setPreviewOpen(false);
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

    const handleCreateTicket = () => {
        formTicket
            .validateFields()
            .then((val) => {
                setLoading(true);

                ticket.id = uuid();
                setListTicket([...listTicket, ticket]);
                formTicket.resetFields();

                setTicket({
                    id: '',
                    date_picker: '',
                    date_picker_str: '',
                    time_show_date: '',
                    time_show_date_str: '',
                    price: '',
                    website: '',
                });

                setLoading(false);
                setOpen(false);
            })
            .catch((error) => {
                console.log('error', error);
            });
    };

    const token = localStorage.getItem('mytoken');
    const config_json = {
        headers: {
            'content-type': 'application/json',
            Authorization: `Token ${token}`,
        },
    };

    const handleCreateMovie = async () => {
        form.validateFields()
            .then((val) => {
                var editMovieRequest = new EditMovieRequest(
                    listTicket,
                    movie.title,
                    movie.description,
                    movie.show_date,
                    movie.time_show_date,
                    movie.close_date,
                    movie.time_close_date,
                    movie.active,
                    movie.titleNoti,
                    movie.summaryNoti
                );
                console.log(editMovieRequest);

                createMovie(JSON.stringify(editMovieRequest), config_json)
                    .then((res) => {
                        console.log('res', res);
                    })
                    .catch((error) => console.log('Error:', error));
            })
            .catch((erorr) => {});
    };

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

    const _buildTableTicket = () => {
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
                                    console.log('Value render', val);
                                    let {
                                        id,
                                        date_picker,
                                        date_picker_str,
                                        time_show_date,
                                        time_show_date_str,
                                        price,
                                        website,
                                    } = val;

                                    setOpen(true);
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

        return <Table columns={columns} dataSource={listTicket} rowKey="id" />;
    };

    const _buildModalTicket = () => {
        console.log('ticket.date_picker', ticket.date_picker);

        return (
            <Modal
                title="Create New Ticket"
                open={open}
                onCancel={handleCancelTicket}
                afterClose={() => {
                    formTicket.resetFields();
                }}
                width="40%"
                footer={[
                    <Row>
                        <Col span={6} offset={10}>
                            <Button
                                key="back"
                                onClick={handleCancelTicket}
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
                                onClick={handleCreateTicket}
                                style={{ backgroundColor: SUCCESS_COLOR }}
                            >
                                Save
                            </Button>
                        </Col>
                    </Row>,
                ]}
            >
                <Form form={formTicket} style={{ width: '100%' }}>
                    <Form.Item
                        name="date_picker"
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
                            defaultValue={ticket.date_picker}
                            value={ticket.date_picker}
                            onChange={(val, valString) => {
                                setTicket({
                                    ...ticket,
                                    date_picker: val,
                                    date_picker_str: valString,
                                });
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
                            defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')}
                            format="HH:mm"
                            defaultValue={ticket.time_show_date}
                            onChange={(val, valString) => {
                                setTicket({
                                    ...ticket,
                                    time_show_date: val,
                                    time_show_date_str: valString,
                                });
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
                            defaultValue={ticket.price}
                            onChange={(val) =>
                                setTicket({
                                    ...ticket,
                                    price: val.target.value,
                                })
                            }
                        />
                    </Form.Item>
                    <Form.Item
                        name="link_to_ticket"
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
                            defaultValue={ticket.website}
                            onChange={(val) =>
                                setTicket({
                                    ...ticket,
                                    website: val.target.value,
                                })
                            }
                        />
                    </Form.Item>
                </Form>
            </Modal>
        );
    };

    const _buildAddMovie = () => (
        <>
            <div
                style={{
                    padding: '24px ',
                    backgroundColor: '#E8E9EB',
                    marginBottom: 16,
                }}
            >
                <Row>
                    <Col>
                        <h2 style={{ color: 'black', textAlign: 'left' }}>
                            ADD MOVIE
                        </h2>
                    </Col>
                    <Col offset={14}>
                        <Button
                            type="primary"
                            size="large"
                            style={{
                                width: 200,
                                backgroundColor: SUCCESS_COLOR,
                            }}
                            onClick={handleCreateMovie}
                        >
                            <FiSave size={25} style={{ marginRight: 8 }} />
                            Save Movie
                        </Button>
                    </Col>
                </Row>
            </div>
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
                                            time_show_date:
                                                valString.split(' ')[1],
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
                                        message:
                                            'Please input notification title',
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
                                onCancel={handleCancelTicket}
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
                            style={{ width: 200, backgroundColor: '#531dab' }}
                            onClick={showModal}
                        >
                            <IoIosAdd size={30} />
                            Create new ticket
                        </Button>
                    </Col>
                </Row>

                {_buildTableTicket()}
            </div>
            {_buildModalTicket()}
        </>
    );

    return (
        <Row>
            {console.log('render ticket', ticket)}
            <Col span={4}>
                <MenuNavigator />
            </Col>
            <Col flex={1}>{_buildAddMovie()}</Col>
        </Row>
    );
}
