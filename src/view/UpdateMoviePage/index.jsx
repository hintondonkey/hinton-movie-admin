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

    const IdCategory = location?.pathname?.split('/')[2];
    const user = useSelector((state) => state?.auth?.user);
    const data = {
        category_id: Number(IdCategory),
        broker_id: user.roles.broker_id,
    };

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getSubCategoryToCategoryToBrokerId(data));
        setMovie({ ...movie, category: Number(IdCategory) });
    }, [IdCategory, user.roles.broker_id]);

    const subCategory = useSelector(
        (state) => state?.category?.getSubCategoryToCategoryToBrokerId
    );

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
    id: 0,
    watchlist: [
        {
            id: 0,
            date_picker: '2023-07-01',
            time_show_date: '09:30',
            price: 2147483647,
            website: 'http://localhost:3000/updateMovie/0',
            active: true,
            create_date: '2023-07-01T11:12:35.568Z',
            platform: 0,
        },
    ],
    stream_flatform_image: [
        {
            id: 0,
            uid: '4.jpg52f73650-d314-4497-973f-0434e561fbf6',
            name: 'string',
            description: 'string',
            file: 'https://firebasestorage.googleapis.com/v0/b/moviewebadmin.appspot.com/o/images%2F2.jpg356829be-7824-411f-bbbd-71de14ec7a4f?alt=media&token=5b85ba1d-ad93-424a-8afa-9bfec298ab0a',
            event: 0,
        },
        {
            id: 1,
            uid: '4.jpg52f73650-d314-4497-973f-0434e561fbf6',
            name: 'string',
            description: 'string',
            file: 'https://firebasestorage.googleapis.com/v0/b/moviewebadmin.appspot.com/o/images%2F2.jpg356829be-7824-411f-bbbd-71de14ec7a4f?alt=media&token=5b85ba1d-ad93-424a-8afa-9bfec298ab0a',
            event: 0,
        },
    ],
    category_name: 'string',
    subcategory_name: 'string',
    title: 'string',
    description: 'string',
    sub_icon:
        'https://firebasestorage.googleapis.com/v0/b/moviewebadmin.appspot.com/o/images%2F2.jpg356829be-7824-411f-bbbd-71de14ec7a4f?alt=media&token=5b85ba1d-ad93-424a-8afa-9bfec298ab0a',
    uid_sub_icon: 'string',
    show_date: '2023-07-01',
    time_show_date: '09:30',
    close_date: '2023-07-01',
    time_close_date: '10:30',
    post_date: '2023-07-01',
    post_time: '14:30',
    close_post_date: '2023-07-01',
    close_post_time: '15:30',
    active: true,
    create_date: '2023-07-01',
    titleNoti: 'string',
    summaryNoti: 'string',
    number_of_connection: 2147483647,
    approval: 'string',
    status: true,
    is_horizontal: true,
    category: 0,
    subcategory: 0,
    broker: 0,
    created_user: 0,
};
