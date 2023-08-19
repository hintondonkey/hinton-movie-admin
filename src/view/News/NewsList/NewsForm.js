import {
    Button,
    Col,
    DatePicker,
    Form,
    Input,
    Row,
    Select,
    Tag,
    Upload,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useState } from 'react';
import { IoIosAdd } from 'react-icons/io';
import moment from 'moment';
import dayjs from 'dayjs';
import { INFO_COLOR, SECONDARY_COLOR } from '../../../constants/colors';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { PlusOutlined } from '@ant-design/icons';
import PushNotiForm from './PushNotiForm';

export default function NewsForm() {
    const [listImageUrl, setListImageUrl] = useState([]);
    const [isFramePoster, setIsFramePoster] = useState(true);

    const disabledDate = (current) => {
        return current && current < moment().startOf('day');
    };

    return (
        <div
            style={{
                width: '85%',
                padding: '24px 24px 24px 24px',
                borderRadius: '25px',
                backgroundColor: '#E8E9EB',
                margin: 'auto',
                boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                marginBottom: 24,
            }}
        >
            <Form
                size={'large'}
                layout="horizontal"
                name="movieForm"
                onFinish={() => {}}
            >
                <Form.Item
                    name="category"
                    rules={[
                        {
                            required: true,
                            message: 'Please input Category',
                        },
                    ]}
                    labelCol={{ span: 3 }}
                    label="Category"
                >
                    <Select
                        placeholder="Sub Category"
                        onChange={() => {}}
                        value={'1'}
                    >
                        <Select.Option key="1" value="1">
                            News
                        </Select.Option>
                        <Select.Option key="2" value="2">
                            Event
                        </Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name="news_title"
                    label="News Title"
                    labelCol={{ span: 3 }}
                    rules={[
                        {
                            required: true,
                            message: 'Please input new title',
                        },
                    ]}
                >
                    <Input onChange={(val) => {}} />
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
                        onChange={(val) => {}}
                    />
                </Form.Item>
                <Form.Item
                    name="content"
                    label="Content"
                    labelCol={{ span: 3 }}
                    rules={[
                        {
                            required: true,
                            message: 'Please input content',
                        },
                    ]}
                >
                    <TextArea
                        rows={3}
                        placeholder="Max length is 500"
                        maxLength={500}
                        onChange={(val) => {}}
                    />
                </Form.Item>
                <Form.Item
                    name="post_date"
                    label="Post Date"
                    labelCol={{ span: 3 }}
                    rules={[
                        {
                            required: true,
                            message: 'Please input post date',
                        },
                    ]}
                >
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'left',
                        }}
                    >
                        <DatePicker
                            showTime={{
                                defaultValue: dayjs('00:00:00', 'HH:mm'),
                            }}
                            format="YYYY-MM-DD HH:mm"
                            disabledDate={disabledDate}
                            onChange={(val, valString) => {}}
                        />
                    </div>
                </Form.Item>
                <Form.Item
                    name="keywords"
                    label="Keywords"
                    labelCol={{ span: 3 }}
                >
                    <Row>
                        <Col span={20}>
                            <Input />
                            <div style={{ marginTop: '10px', display: 'flex' }}>
                                {['Thanh', 'Kiên'].map((tag, index) => (
                                    <Tag
                                        key={index}
                                        closable
                                        color={INFO_COLOR}
                                        onClose={() => {}}
                                    >
                                        {tag}
                                    </Tag>
                                ))}
                            </div>
                        </Col>
                        <Col span={4}>
                            <Button
                                type="primary"
                                style={{
                                    backgroundColor: SECONDARY_COLOR,
                                }}
                            >
                                Add
                            </Button>
                        </Col>
                    </Row>
                </Form.Item>
                <Form.Item label="Images" labelCol={{ span: 3 }}>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'left',
                            marginLeft: 16,
                        }}
                    ></div>
                </Form.Item>
                <Row>
                    {listImageUrl.length === 0 ? <Col span={3}></Col> : null}
                    {listImageUrl.map((val, index) => (
                        <Col style={{ marginTop: 12 }}>
                            <PhotoProvider>
                                <PhotoView key={1} src={val}>
                                    <img
                                        width={isFramePoster ? 200 : 400}
                                        height={300}
                                        src={val ? val : ''}
                                        alt=""
                                        style={{
                                            marginRight: 10,
                                            marginBottom: 10,
                                            borderRadius: 15,
                                        }}
                                    />
                                </PhotoView>
                            </PhotoProvider>
                            <div>
                                <Button
                                    type="primary"
                                    danger
                                    onClick={() => {}}
                                >
                                    <MdOutlineDeleteOutline size={20} />
                                </Button>
                            </div>
                        </Col>
                    ))}

                    <Col>
                        <Upload
                            listType="picture-card"
                            showUploadList={false}
                            fileList={listImageUrl}
                            onChange={() => {}}
                        >
                            {listImageUrl.length >= 5
                                ? null
                                : uploadButton('Upload Image')}
                        </Upload>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}

const uploadButton = (name) => (
    <div>
        <PlusOutlined />
        <div
            style={{
                marginTop: 8,
            }}
        >
            {name}
        </div>
    </div>
);
