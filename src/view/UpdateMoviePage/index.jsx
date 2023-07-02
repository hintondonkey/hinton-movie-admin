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
import { getDetailMovies } from '../../services/movie/moiveSlice';

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
    const [listTicket, setListTicket] = useState(itemDetailData.watchlist);
    const [loading, setLoading] = useState(false);
    const [itemDetail, setItemDetail] = useState(itemDetailData);

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

    console.log('detailMovie 123456789 : ', detailMovie);

    const navigate = useNavigate();

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
    }, [IdMovie, detailMovie?.category]);

    const handleUpdateMovie = async (movie) => {
        console.log('handleUpdateMovie in index: ', movie);
        const data = {
            show_date: moment(movie.show_date).format('YYYY-MM-DD'),
            time_show_date: movie.time_show_date,
            close_date: moment(movie.close_date).format('YYYY-MM-DD'),
            time_close_date: movie.time_close_date,
            title: movie.title,
            stream_flatform_image: { uid: movie.image, uid2: movie.image },
            sub_icon: { uid: movie.sub_icon },
            description: movie.description,
            titleNoti: movie.titleNoti,
            summaryNoti: movie.summaryNoti,
            ischecked: movie.active,
        };
        console.log(data);

        // await putMovie(data, config_json, movie.id).then((res) => {
        //     console.log('res put movie', res);
        //     SHOW_SUCCESS_MESSAGE('Update Movie Success !!!');
        //     navigate('/listmovie');
        // });
    };

    const handleClickSaveMovie = () => {
        form.validateFields()
            .then((val) => {
                if (listTicket === null || listTicket.length === 0) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Please input ticket !!!',
                        showConfirmButton: true,
                    }).then((result) => {});
                } else {
                    form.submit();
                }
            })
            .catch((erorr) => {
                console.log('error', erorr);
            });
    };

    const mapTicketToRequest = (listTicket) => {
        return listTicket.map((item) => {
            return {
                date_picker: item.datePickerStr,
                time_show_date: item.timeShowDateStr,
                price: item.price,
                website: item.website,
            };
        });
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
                    onClick={handleClickSaveMovie}
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

                    <MovieForm
                        form={form}
                        movie={itemDetail}
                        setMovie={setMovie}
                        subCategory={subCategory}
                    />
                    <TicketForm
                        listTicket={listTicket}
                        setListTicket={setListTicket}
                        formTicket={formTicket}
                    />
                </Col>
            </Row>
            {loading ? <LoadingSpin /> : <></>}
        </div>
    );
}

let itemDetailData = {
    id: 6,
    watchlist: [
        {
            id: 1,
            date_picker: '2023-07-01',
            time_show_date: '21:22:00',
            price: 20,
            website:
                'https://motphimtv.me/phim/than-lan-ky-vuc-vo-song-chau-10469.html',
            active: true,
            create_date: '2023-07-01T14:23:34.450245Z',
            platform: 6,
        },
    ],
    stream_platform_image: [
        {
            id: 1,
            uid: '100423-eternals-16811150170881958369065.jpgc05d7cf8-e19c-4ec9-974c-7190db8e8571',
            name: 'https://firebasestorage.googleapis.com/v0/b/moviewebadmin.appspot.com/o/images%2F100423-eternals-16811150170881958369065.jpgc05d7cf8-e19c-4ec9-974c-7190db8e8571?alt=media&token=ee664f8c-0cac-45e9-baf2-e90719830676',
            file_name: null,
            file_size: null,
            description: null,
            stream_platform: 6,
        },
        {
            id: 2,
            uid: '100423-marvel-2-1681114948845267268576.jpgf27ad5d9-bbbc-4405-ae83-100eb89e50e7',
            name: 'https://firebasestorage.googleapis.com/v0/b/moviewebadmin.appspot.com/o/images%2F100423-marvel-2-1681114948845267268576.jpgf27ad5d9-bbbc-4405-ae83-100eb89e50e7?alt=media&token=6a344352-9c65-4309-9530-23a66350450f',
            file_name: null,
            file_size: null,
            description: null,
            stream_platform: 6,
        },
    ],
    category_name: 'Event',
    subcategory_name: 'sub business_admin',
    title: 'phim ma đang sợ quá',
    description: 'hello cô ba',
    sub_icon:
        'https://firebasestorage.googleapis.com/v0/b/moviewebadmin.appspot.com/o/images%2F100423-ant-man-16811148589681138415771.jpg5bb42187-d98e-4f0d-b791-4a1b3b08b2c2?alt=media&token=a50bea25-3658-49bd-802b-3ea7b3edaf20',
    uid_sub_icon:
        '100423-ant-man-16811148589681138415771.jpg5bb42187-d98e-4f0d-b791-4a1b3b08b2c2',
    show_date: '2023-07-01',
    time_show_date: '21:22:00',
    close_date: '2023-07-01',
    time_close_date: '21:22:00',
    post_date: '2023-07-01',
    post_time: '21:22:00',
    close_post_date: '2023-07-01',
    close_post_time: '21:22:00',
    active: true,
    create_date: '2023-07-01',
    titleNoti: '',
    summaryNoti: '',
    number_of_connection: 0,
    approval: null,
    status: true,
    is_horizontal: true,
    category: 1,
    subcategory: 11,
    broker: 6,
    created_user: 14,
};
