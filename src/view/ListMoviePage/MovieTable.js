import { Button, Image, Space, Table, Tag } from 'antd';
import React from 'react';
import { DANGER_COLOR } from '../../constants/colors';

export default function MovieTable(props) {
    let { data } = props;

    console.log(
        'data',
        data.map((item) => {
            let abc = { ...item };
            abc.key = item.id;
            return abc;
        })
    );

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (image) => (
                <div>
                    <Image
                        width={80}
                        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                    />
                </div>
            ),
        },
        {
            title: 'Show Date',
            dataIndex: 'show_date',
            key: 'show_date',
        },
        {
            title: 'Close Date',
            key: 'close_date',
            dataIndex: 'close_date',
        },
        {
            title: 'Active',
            key: 'active',
            render: (item) => (
                <span>
                    <Tag color={item.active ? 'green' : 'red'}>
                        {item.active ? 'Active' : 'Inactive'}
                    </Tag>
                </span>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="primary"> Edit</Button>
                    <Button danger type="primary">
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div
            style={{
                padding: 16,
            }}
        >
            <Table
                style={{
                    boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
                    borderRadius: 20,
                }}
                columns={columns}
                dataSource={data}
            />
        </div>
    );
}
