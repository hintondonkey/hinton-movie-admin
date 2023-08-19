import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'antd';
import MenuNavigator from '../../../components/MenuNavigator';
import LoadingSpin from '../../../common/LoadingSpin';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SUCCESS_COLOR } from '../../../constants/colors';
import { FiSave } from 'react-icons/fi';
import NewsForm from './NewsForm';
import PushNotiForm from './PushNotiForm';

export default function NewsListPage() {
    const [loading, setLoading] = useState(false);

    const location = useLocation();
    const dispatch = useDispatch();
    const { state } = location;

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
                    onClick={() => {}}
                >
                    <FiSave size={25} style={{ marginRight: 8 }} />
                    Save Event
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
                    <NewsForm />
                    <PushNotiForm />
                </Col>
            </Row>
            {loading ? <LoadingSpin /> : <></>}
        </div>
    );
}
