import { Button, Card, Col, Pagination, Row, Switch } from 'antd';
import React, { useEffect, useState } from 'react';

import { IoAddCircleOutline } from 'react-icons/io5';
import LoadingSpin from '../../common/LoadingSpin';
import MenuNavigator from '../../components/MenuNavigator';
import { INFO_COLOR } from '../../constants/colors';
import { getAllMovie } from '../../services/UserService';
import MovieCard from './MovieCard';
import { useNavigate } from 'react-router-dom';
import MovieTable from './MovieTable';
import axios from '../../axios';
import { config } from '../../utility/axiosconfig';
import { listMovies } from '../../services/movie/movieServices';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMovies } from '../../services/movie/moiveSlice';

export default function ListMoviePage() {
    const [loading, setLoading] = useState(false);
    // const [listMovie, setListMovie] = useState(listMovies);
    const [totalItem, setTotalItem] = useState(0);
    const [isCard, setIsCard] = useState(false);
    const user = useSelector((state) => state?.auth?.user?.roles);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllMovies(user.broker_id));
    }, []);

    const listMovie = useSelector((state) => state?.movie?.movie);

    const handleOpenDetailMovie = (item) => {
        //  navigate(`/addmovie/${item.id}`, { state: { item } });
        navigate(`/updateMovie/${item.id}`);
    };

    const _buildHeader = () => (
        <Row>
            <Col>
                <h2 style={{ color: 'black', textAlign: 'left' }}>
                    LIST MOVIE
                </h2>
            </Col>
        </Row>
    );

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

                    <div
                        style={{
                            display: 'flex',
                            alignContent: 'flex-start',
                            paddingLeft: 16,
                        }}
                    >
                        <Switch
                            style={{
                                width: 80,
                                textAlign: 'left',
                                alignItems: 'left',
                            }}
                            checkedChildren="Card"
                            unCheckedChildren="Table"
                            onChange={(val) => {
                                setIsCard(val);
                            }}
                        />
                    </div>
                    {isCard === false ? (
                        <MovieTable
                            data={
                                listMovie &&
                                listMovie.length > 0 &&
                                listMovie.map((item) => {
                                    let abc = { ...item };
                                    abc.key = item.id;
                                    return abc;
                                })
                            }
                            handleOpenDetailMovie={handleOpenDetailMovie}
                        />
                    ) : (
                        // <FilterTable />
                        <Col style={{ backgroundColor: 'white' }}>
                            <Row gutter={[24, 24]} style={{ padding: 16 }}>
                                {listMovie &&
                                    listMovie.length > 0 &&
                                    listMovie.map((item) => (
                                        <MovieCard
                                            key={item.id}
                                            item={item}
                                            handleOpenDetailMovie={
                                                handleOpenDetailMovie
                                            }
                                        />
                                    ))}
                            </Row>
                        </Col>
                    )}
                </Col>
            </Row>
            {loading ? <LoadingSpin /> : <></>}
        </div>
    );
}
