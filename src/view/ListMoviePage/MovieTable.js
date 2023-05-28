import { SearchOutlined } from '@ant-design/icons';
import { Button, Image, Input, Space, Table, Tag, Tooltip } from 'antd';
import React, { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';

export default function MovieTable(props) {
    let { data, handleOpenDetailMovie } = props;

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 5,
        },
    });
    const searchInput = useRef(null);

    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            ...sorter,
        });
    };

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
            close,
        }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                {console.log('dataIndex: ', dataIndex)}
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() =>
                        handleSearch(selectedKeys, confirm, dataIndex)
                    }
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() =>
                            handleSearch(selectedKeys, confirm, dataIndex)
                        }
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() =>
                            clearFilters && handleReset(clearFilters)
                        }
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                <Tooltip title={text}>
                    <div
                        style={{
                            width: 180,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            fontWeight: 'bold',
                            fontSize: 16,

                            color: ' #008080 ',
                        }}
                    >
                        {text}
                    </div>
                </Tooltip>
            ),
    });

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',

            width: 200,
            sorter: (a, b) => a.title.localeCompare(b.title) > 0,
            ...getColumnSearchProps('title'),
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (image) => (
                <div
                    style={{ width: 80, borderRadius: 15, overflow: 'hidden' }}
                >
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
            sorter: (a, b) => new Date(a.show_date) - new Date(b.show_date),
        },
        {
            title: 'Close Date',
            key: 'close_date',
            dataIndex: 'close_date',
            sorter: (a, b) => new Date(a.close_date) - new Date(b.close_date),
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
            sorter: (a, b) => a.active - b.active,
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        type="primary"
                        onClick={() => handleOpenDetailMovie(record)}
                    >
                        {' '}
                        Edit
                    </Button>
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
                pagination={tableParams.pagination}
                onChange={handleTableChange}
            />
        </div>
    );
}
