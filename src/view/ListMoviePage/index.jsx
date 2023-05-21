import { Button, Card, Col, Pagination, Row } from 'antd';
import React, { useEffect, useState } from 'react';

import { IoAddCircleOutline } from 'react-icons/io5';
import LoadingSpin from '../../common/LoadingSpin';
import MenuNavigator from '../../components/MenuNavigator';
import { INFO_COLOR } from '../../constants/colors';
import { getAllMovie } from '../../services/UserService';
import MovieCard from './MovieCard';
import { useNavigate } from 'react-router-dom';

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

    const navigate = useNavigate();

    useEffect(() => {
        apiGetAllMovie();
    }, []);

    const handleOpenDetailMovie = (item) => {
        navigate(`/addmovie/${item.id}`, { state: { item } });
    };

    const _buildHeader = () => (
        <Row>
            <Col>
                <h2 style={{ color: 'black', textAlign: 'left' }}>
                    LIST MOVIE
                </h2>
            </Col>
            {/* <Col offset={14}>
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
            </Col> */}
        </Row>
    );

    const apiGetAllMovie = async () => {
        setLoading(true);
        let res = await getAllMovie(config);
        setLoading(false);

        console.log('res', res);

        setTotalItem(res.length);

        // Đảo ngược list để lấy phim có ngày tạo mới nhất
        setListMovie(res.reverse());
    };

    return (
        <div style={{ height: '100vh' }}>
            <Row style={{ height: '100vh' }}>
                <Col span={4}>
                    <MenuNavigator />
                </Col>
                <Col span={20}>
                    <div
                        style={{
                            padding: '24px ',
                            backgroundColor: '#E8E9EB',
                            marginBottom: 16,
                        }}
                    >
                        {_buildHeader()}
                    </div>
                    <Col style={{ backgroundColor: '#E8E9EB' }}>
                        <Row gutter={[24, 24]} style={{ padding: 16 }}>
                            {listMovie.map((item) => (
                                <MovieCard
                                    key={item.id}
                                    item={item}
                                    handleOpenDetailMovie={
                                        handleOpenDetailMovie
                                    }
                                />
                            ))}
                        </Row>
                        <Pagination
                            current={1}
                            defaultCurrent={1}
                            total={totalItem}
                        />
                    </Col>
                </Col>
            </Row>
            {loading ? <LoadingSpin /> : <></>}
        </div>
    );
}
