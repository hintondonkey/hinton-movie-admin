import { Button, Col, Row } from 'antd';

import React from 'react';
import MenuNavigator from '../../components/MenuNavigator';
import './styles.css';

import { FiSave } from 'react-icons/fi';

import '../../constants/colors';
import { SUCCESS_COLOR } from '../../constants/colors';
import '../../models/edit_movie_request';
import MovieForm from './MovieForm';
import TicketForm from './TicketForm';
import TicketModal from './TicketModal';

export default function AddMoviePage() {
    const handleCreateMovie = async () => {
        // form.validateFields()
        //     .then((val) => {
        //         var editMovieRequest = new EditMovieRequest(
        //             listTicket,
        //             movie.title,
        //             movie.description,
        //             movie.show_date,
        //             movie.time_show_date,
        //             movie.close_date,
        //             movie.time_close_date,
        //             movie.active,
        //             movie.titleNoti,
        //             movie.summaryNoti
        //         );
        //         createMovie(JSON.stringify(editMovieRequest), config_json)
        //             .then((res) => {})
        //             .catch((error) => console.log('Error:', error));
        //     })
        //     .catch((erorr) => {});
    };

    // const handleCancel = () => setPreviewOpen(false);

    const token = localStorage.getItem('mytoken');

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
                    onClick={handleCreateMovie}
                >
                    <FiSave size={25} style={{ marginRight: 8 }} />
                    Save Movie
                </Button>
            </Col>
        </Row>
    );

    return (
        <Row>
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
                <MovieForm />
                <TicketForm />
                <TicketModal />
            </Col>
        </Row>
    );
}
