import { Button, Col, Form, Row, Spin } from 'antd';

import React, { useState } from 'react';
import MenuNavigator from '../../components/MenuNavigator';
import './styles.css';

import { FiSave } from 'react-icons/fi';

import '../../constants/colors';
import { SUCCESS_COLOR } from '../../constants/colors';
import '../../models/edit_movie_request';
import { EditMovieRequest } from '../../models/edit_movie_request';
import { createMovie, postcreateMovie } from '../../services/UserService';
import MovieForm from './MovieForm';
import TicketForm from './TicketForm';
import Swal from 'sweetalert2';
import LoadingSpin from '../../common/LoadingSpin';
import { useNavigate } from 'react-router-dom';

const token = localStorage.getItem('mytoken');

const config_json = {
    headers: {
        'content-type': 'application/json',
        Authorization: `Token ${token}`,
    },
};

export default function AddMoviePage() {
    const [form] = Form.useForm();
    const [listTicket, setListTicket] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleClickSaveMovie = () => {
        form.validateFields()
            .then((val) => {
                console.log('Submit form');
                console.log('listTicket', listTicket === []);
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

    const handleCreateMovie = async (movie) => {
        console.log('movie: ', movie);

        var editMovieRequest = new EditMovieRequest(
            mapTicketToRequest(listTicket),
            movie.title,
            movie.description,
            movie.show_date,
            movie.time_show_date,
            movie.close_date,
            movie.time_close_date,
            movie.active,
            movie.titleNoti,
            movie.summaryNoti
        );
        setLoading(true);

        postcreateMovie(JSON.stringify(editMovieRequest), config_json)
            .then((res) => {
                setTimeout(() => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Create Success !!!',
                        showConfirmButton: false,
                        timer: 1500,
                    }).then((result) => {
                        // navigate('/listmovie');
                    });
                }, 1000);
            })
            .catch((error) => console.log('Error:', error));

        setLoading(false);
    };

    const _buildHeader = () => (
        <Row>
            <Col>
                <h2 style={{ color: 'black', textAlign: 'left' }}>ADD MOVIE</h2>
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
                    />
                    <TicketForm
                        listTicket={listTicket}
                        setListTicket={setListTicket}
                    />
                </Col>
            </Row>
            {loading ? <LoadingSpin /> : <></>}
        </div>
    );
}
