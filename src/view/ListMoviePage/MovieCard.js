import { Card, Col, Image } from 'antd';
import React from 'react';

export default function MovieCard() {
    return (
        <Col span={6}>
            <div
                style={{
                    padding: 0,
                    borderRadius: 16,
                    backgroundColor: 'white',
                    overflow: 'hidden',
                    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px;',
                }}
            >
                <div
                    style={{
                        height: 300,
                    }}
                >
                    <img
                        style={{ height: '90%', width: '100%' }}
                        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                    />
                </div>
                <div style={{ textAlign: 'left', padding: 8 }}>
                    <p
                        style={{
                            textAlign: 'center',
                            color: '#7c795d',
                            fontFamily: 'Trocchi',
                            fontSize: 30,
                            fontWeight: 'normal',
                        }}
                    >
                        End Game
                    </p>
                    <p>Start:</p>
                    <p>End:</p>
                </div>
            </div>
        </Col>
    );
}
