import React, { useEffect, useState } from 'react';
import './styles.css';
import { HiOutlineMail } from 'react-icons/hi';
import { AiFillLock } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { handleLoginApi } from '../../services/UserService';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const token = localStorage.getItem('mytoken');
    let navigate = useNavigate();

    useEffect(() => {
        if (token) {
            window.location.href = '/listmovie';
            return;
        }
    }, [token]);

    const login = async () => {
        let res = await handleLoginApi(username, password);

        if (res.token) {
            localStorage.setItem('mytoken', res.token);

            navigate('/listmovie');
        } else {
            setError('Invalid username or password');
            return;
        }
    };

    return (
        <section>
            <div className="form-box">
                <div className="form-value">
                    <form action>
                        <h2>Login</h2>
                        <div className="inputbox">
                            <HiOutlineMail className="inputbox_icon" />
                            <input
                                required
                                value={username}
                                onChange={(evt) =>
                                    setUsername(evt.target.value)
                                }
                            />
                            <label htmlFor>Email</label>
                        </div>
                        <div className="inputbox">
                            <AiFillLock className="inputbox_icon" />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(evt) =>
                                    setPassword(evt.target.value)
                                }
                            />
                            <label>Password</label>
                        </div>
                        <div className="forget">
                            <label>
                                <input type="checkbox" />
                                Remember Me <a href="#">Forget Password</a>
                            </label>
                        </div>
                        <button type="button" onClick={login}>
                            Log in
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
