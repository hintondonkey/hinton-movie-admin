import { Button, Col, Form, Row } from 'antd';

import React, { useEffect, useState } from 'react';
import MenuNavigator from '../../components/MenuNavigator';
import './styles.css';

import { FiSave } from 'react-icons/fi';

import moment from 'moment';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import LoadingSpin from '../../common/LoadingSpin';
import '../../constants/colors';
import { SUCCESS_COLOR } from '../../constants/colors';
import '../../models/edit_movie_request';
import { EditMovieRequest } from '../../models/edit_movie_request';
import { postcreateMovie, putMovie } from '../../services/UserService';
import MovieForm from './MovieForm';
import TicketForm from './TicketForm';
import { SHOW_SUCCESS_MESSAGE } from '../../utility/AlertUtility';
import dayjs from 'dayjs';
import { getImageUid, uploadImage } from '../../services/Firebase';
import { useDispatch, useSelector } from 'react-redux';
import { getSubCategoryToCategoryToBrokerId } from '../../services/category/categorySlice';
import { createMovie, getAllMovies } from '../../services/movie/moiveSlice';
import { toast } from 'react-toastify';

export default function AddMoviePage() {
    const [form] = Form.useForm();
    const [formTicket] = Form.useForm();
    const [listTicket, setListTicket] = useState([]);
    const [loading, setLoading] = useState(false);

    const [movie, setMovie] = useState({
        subcategory: '',
        category: '',
        title: '',
        description: '',
        show_date: '',
        time_show_date: '',
        close_date: '',
        time_close_date: '',
        post_date: '',
        post_time: '',
        close_post_date: '',
        close_post_time: '',
        active: true,
        titleNoti: '',
        summaryNoti: '',
        stream_platform_image: [],
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

    const current_moive = useSelector((state) => state?.movie);

    const { isSuccess, isError, isLoading } = current_moive;
    useEffect(() => {
        dispatch(getSubCategoryToCategoryToBrokerId(data));
        setMovie({ ...movie, category: Number(IdCategory) });
    }, [IdCategory, user.roles.broker_id]);

    const subCategory = useSelector(
        (state) => state?.category?.getSubCategoryToCategoryToBrokerId
    );

    const handleClickSaveMovie = () => {
        form.validateFields()
            .then((val) => {
                // console.log('Submit form');
                // console.log('listTicket', listTicket);
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

    const handleCreateMovie = async (movie, listObjectImage, objectSubIcon) => {
        console.log('test listObjectImage', listObjectImage);

        // dict chứa hình ảnh

        let image = [];
        let sub_icon = '';
        let uid_sub_icon = '';

        setLoading(true);
        // Bước upload hình
        try {
            // console.log('objectSubIcon', objectSubIcon);

            const promisesImage = listObjectImage.map((objectImage) => {
                return new Promise((resolve) => {
                    uploadImage(objectImage, (url) => {
                        let requestImageObject = {};
                        requestImageObject['uid'] = getImageUid(url);
                        requestImageObject['name'] = url;

                        image.push(requestImageObject);
                        resolve();
                    });
                });
            });
            await Promise.all(promisesImage);
        } catch {}

        try {
            const promisesIcon = () => {
                return new Promise((resolve) => {
                    uploadImage(objectSubIcon.originFileObj, (url) => {
                        // imageSubIcon = url;
                        sub_icon = url;
                        uid_sub_icon = getImageUid(url);
                        resolve();
                    });
                });
            };
            await Promise.all([promisesIcon()]);
        } catch (error) {}

        var editMovieRequest = new EditMovieRequest(
            mapTicketToRequest(listTicket),
            movie.title,
            movie.description,
            movie.show_date,
            movie.time_show_date,
            movie.close_date,
            movie.time_close_date,
            movie.post_date,
            movie.post_time,
            movie.close_post_date,
            movie.close_post_time,
            movie.active,
            movie.titleNoti,
            movie.summaryNoti,
            movie.category,
            (movie.stream_platform_image = image),
            (movie.sub_icon = sub_icon),
            (movie.uid_sub_icon = uid_sub_icon),
            movie.is_horizontal,
            movie.subcategory
        );

        console.log('editMovieRequest', editMovieRequest);
        setTimeout(() => {
            setLoading(false);
            const res = dispatch(createMovie(editMovieRequest));
            if (isSuccess && res.arg) {
                dispatch(getAllMovies(user.broker_id));
                toast.success(`create ${movie.title} Successfullly!`);
            }
        }, 3000);
        navigate('/listmovie');
    };

    const _buildHeader = () => (
        <Row>
            <Col>
                <h2 style={{ color: 'black', textAlign: 'left' }}>
                    {state === null || state === undefined
                        ? ' ADD NEW MOVIE'
                        : 'EDIT MOVIE'}
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
                        handleCreateMovie={handleCreateMovie}
                        movie={movie}
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
