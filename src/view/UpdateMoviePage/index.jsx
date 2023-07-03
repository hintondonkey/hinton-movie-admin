import { Button, Col, Form, Row } from 'antd';

import React, { useEffect, useState } from 'react';
import MenuNavigator from '../../components/MenuNavigator';
import './styles.css';

import { FiSave } from 'react-icons/fi';

import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import LoadingSpin from '../../common/LoadingSpin';
import '../../constants/colors';
import { SUCCESS_COLOR } from '../../constants/colors';
import '../../models/edit_movie_request';
import { getSubCategoryToCategoryToBrokerId } from '../../services/category/categorySlice';
import MovieForm from './MovieForm';
import TicketForm from './TicketForm';
import dayjs from 'dayjs';
import { getDetailMovies, updateMovie } from '../../services/movie/moiveSlice';

const token = localStorage.getItem('mytoken');

const config_json = {
    headers: {
        'content-type': 'application/json',
        Authorization: `Token ${token}`,
    },
};

export default function UpdateMoviePage() {
    const [form] = Form.useForm();
    const [formTicket] = Form.useForm();
    const [listTicket, setListTicket] = useState([]);
    const [loading, setLoading] = useState(false);

    const [movie, setMovie] = useState({
        id: '',
        subcategory: '',
        category: '',
        title: '',
        description: '',
        show_date: '',
        time_show_date: '',
        close_date: '',
        time_close_date: '',
        post_date: '',
        time_post_date: '',
        end_post_date: '',
        time_end_post_date: '',
        active: true,
        titleNoti: '',
        summaryNoti: '',
        stream_flatform_image: [],
        sub_icon: '',
        uid_sub_icon: '',
        is_horizontal: true,
        is_notification: false,
    });

    const location = useLocation();
    const dispatch = useDispatch();
    const { state } = location;

    const IdMovie = location?.pathname?.split('/')[2];
    const user = useSelector((state) => state?.auth?.user);
    const detailMovie = useSelector((state) => state?.movie?.getDetailMovies);
    const subCategory = useSelector(
        (state) => state?.category?.getSubCategoryToCategoryToBrokerId
    );

    const navigate = useNavigate();

    useEffect(() => {
        if (detailMovie !== null && detailMovie !== undefined) {
            setListTicket(detailMovie.watchlist);
        }
    }, [detailMovie]);

    useEffect(() => {
        setLoading(true);
        dispatch(getDetailMovies(IdMovie));
        setTimeout(() => {
            setLoading(false);
            dispatch(
                getSubCategoryToCategoryToBrokerId({
                    broker_id: user?.roles?.broker_id,
                    category_id: detailMovie && detailMovie?.category,
                })
            );
        }, 3000);
        setMovie(detailMovie);
    }, [IdMovie, detailMovie?.category]);

    const handleUpdateMovie = async (movie) => {
        console.log('Movie :  ', movie);
        const newMovie = { ...movie };
        delete newMovie.watchlist;
        if (!('is_notification' in newMovie)) {
            // Nếu chưa tồn tại, thêm trường is_notification với giá trị là false
            newMovie.is_notification = false;
        }
        const data = { id: IdMovie, data: newMovie };
        dispatch(updateMovie(data));
    };

    const _buildHeader = () => (
        <Row>
            <Col>
                <h2 style={{ color: 'black', textAlign: 'left' }}>
                    UPDATE MOVIE
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
                    onClick={() => handleUpdateMovie(movie)}
                >
                    <FiSave size={25} style={{ marginRight: 8 }} />
                    Save Movie
                </Button>
            </Col>
        </Row>
    );

    return (
        <div style={{ height: '100vh' }}>
            <Row style={{ height: '100%' }}>
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
                    {detailMovie !== null && detailMovie !== undefined ? (
                        <>
                            <MovieForm
                                form={form}
                                detailMovie={detailMovie}
                                setMovie={setMovie}
                                movie={movie}
                                subCategory={subCategory}
                            />
                            <TicketForm
                                listTicket={listTicket}
                                setListTicket={(newList) => {
                                    setListTicket(newList);
                                }}
                                formTicket={formTicket}
                                IdMovie={IdMovie}
                            />
                        </>
                    ) : null}
                </Col>
            </Row>
            {loading ? <LoadingSpin /> : <></>}
        </div>
    );
}
