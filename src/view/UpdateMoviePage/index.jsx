import { Button, Col, Form, Row } from 'antd';

import React, { useEffect, useState } from 'react';
import MenuNavigator from '../../components/MenuNavigator';
import './styles.css';

import { FiSave } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import LoadingSpin from '../../common/LoadingSpin';
import '../../constants/colors';
import { INFO_COLOR, SUCCESS_COLOR } from '../../constants/colors';
import '../../models/edit_movie_request';
import { getSubCategoryToCategoryToBrokerId } from '../../services/category/categorySlice';
import MovieForm from './MovieForm';
import TicketForm from './TicketForm';
import { getDetailMovies, updateMovie } from '../../services/movie/moiveSlice';
import { toast } from 'react-toastify';
import { deleteImage, getImageUid, uploadImage } from '../../services/Firebase';
import { uuidv4 } from '@firebase/util';

export default function UpdateMoviePage() {
    const [form] = Form.useForm();
    const [formTicket] = Form.useForm();
    const [listTicket, setListTicket] = useState([]);
    const [loading, setLoading] = useState(false);
    var [listImage, setListImage] = useState([]);
    var [listObjectImageUpload, setListObjectImageUpload] = useState([]);
    const [listDeleteImageFirebase, setListDeleteImageFirebase] = useState([]);

    var [movie, setMovie] = useState({
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
        stream_platform_image: [],
        sub_icon: '',
        uid_sub_icon: '',
        is_horizontal: true,
        is_notification: false,
    });

    const location = useLocation();
    const dispatch = useDispatch();

    const IdMovie = location?.pathname?.split('/')[2];
    const user = useSelector((state) => state?.auth?.user);
    const detailMovie = useSelector((state) => state?.movie?.getDetailMovies);
    const update_Movie = useSelector((state) => state?.movie?.update_movie);
    const subCategory = useSelector(
        (state) => state?.category?.getSubCategoryToCategoryToBrokerId
    );

    const navigate = useNavigate();

    useEffect(() => {
        if (detailMovie !== null && detailMovie !== undefined) {
            setListTicket(detailMovie.watchlist);
            setMovie({ ...detailMovie });
        }
    }, [detailMovie]);

    useEffect(() => {
        if (update_Movie) {
            toast.success('update Movie Successfullly!');
            navigate('/listmovie');
        }
    });

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

    const handleDeleteImageInFirebase = (linkImage) => {
        setListDeleteImageFirebase([...listDeleteImageFirebase, linkImage]);
    };

    const handleUpdateMovie = async () => {
        setLoading(true);

        let listImageSuccessUpload = [];

        // Bước upload hình
        try {
            const promisesImage = listObjectImageUpload.map((objectImage) => {
                return new Promise((resolve) => {
                    uploadImage(objectImage.file, (url) => {
                        listImageSuccessUpload.push({
                            id: uuidv4(),
                            name: url,
                            uid: getImageUid(url),
                        });
                        resolve();
                    });
                });
            });
            await Promise.all(promisesImage);
        } catch {}

        if (listDeleteImageFirebase.length > 0) {
            try {
                const promisesDeleteImage = listDeleteImageFirebase.map(
                    (imageUrl) => {
                        return new Promise((resolve) => {
                            deleteImage(getImageUid(imageUrl));
                            resolve();
                        });
                    }
                );
                await Promise.all(promisesDeleteImage);
            } catch {}
        }

        listImageSuccessUpload.map((e) => {
            console.log(
                '  movie.stream_platform_image',
                movie.stream_platform_image
            );
            movie.stream_platform_image = [...movie.stream_platform_image, e];
            return e;
        });

        console.log('Uploading image : ', movie);
        const newMovie = { ...movie };
        delete newMovie.watchlist;
        if (!('is_notification' in newMovie)) {
            // Nếu chưa tồn tại, thêm trường is_notification với giá trị là false
            newMovie.is_notification = false;
        }
        const data = { id: IdMovie, data: newMovie };

        dispatch(updateMovie(data));
        setLoading(false);
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
                        backgroundColor: INFO_COLOR,
                    }}
                    onClick={handleUpdateMovie}
                >
                    <FiSave size={25} style={{ marginRight: 8 }} />
                    Update Movie
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
                                listObjectImageUpload={listObjectImageUpload}
                                handleDeleteImageInFirebase={
                                    handleDeleteImageInFirebase
                                }
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
