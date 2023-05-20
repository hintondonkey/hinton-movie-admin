import { Button, Card, Col, Pagination, Row } from 'antd';
import React, { useEffect, useState } from 'react';

import { IoAddCircleOutline } from 'react-icons/io5';
import LoadingSpin from '../../common/LoadingSpin';
import MenuNavigator from '../../components/MenuNavigator';
import { INFO_COLOR } from '../../constants/colors';
import { getAllMovie } from '../../services/UserService';
import MovieCard from './MovieCard';

const token = localStorage.getItem('mytoken');
const config = {
    headers: {
        'content-type': 'application/json',
        Authorization: `Token ${token}`,
    },
};

export default function ListMoviePage() {
    const [loading, setLoading] = useState(false);
    const [listMovie, setListMovie] = useState([]);
    const [totalItem, setTotalItem] = useState(0);

    useEffect(() => {
        getFullMovie();
    }, []);

    const _buildHeader = () => (
        <Row>
            <Col>
                <h2 style={{ color: 'black', textAlign: 'left' }}>
                    LIST MOVIE
                </h2>
            </Col>
            <Col offset={14}>
                <Button
                    type="primary"
                    size="large"
                    style={{
                        width: 300,
                        backgroundColor: INFO_COLOR,
                    }}
                >
                    <IoAddCircleOutline
                        size={25}
                        color="white"
                        style={{ marginRight: 8 }}
                    />
                    Create New Movie
                </Button>
            </Col>
        </Row>
    );

    const getFullMovie = async () => {
        let res = await getAllMovie(config);

        setTotalItem(res.length);

        setListMovie(res);
    };

    return (
        <div style={{ height: '100vh' }}>
            <Row style={{ height: '100vh' }}>
                <Col span={4}>
                    <MenuNavigator />
                </Col>
                <Col flex={1}>
                    <div
                        style={{
                            padding: '24px ',
                            backgroundColor: '#E8E9EB',
                            marginBottom: 16,
                        }}
                    >
                        {_buildHeader()}
                    </div>
                    <div style={{ backgroundColor: '#E8E9EB' }}>
                        <Row gutter={[16, 16]} style={{ padding: 16 }}>
                            <MovieCard />
                            <MovieCard />
                            <MovieCard />
                            <MovieCard />
                            <MovieCard />
                        </Row>
                        <Pagination
                            current={1}
                            defaultCurrent={1}
                            total={totalItem}
                        />
                    </div>
                </Col>
            </Row>
            {loading ? <LoadingSpin /> : <></>}
        </div>
    );
}
