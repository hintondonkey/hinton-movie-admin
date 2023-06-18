import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Listmovie from './components/ListMovie';

import 'antd/dist/reset.css';
import { ToastContainer } from 'react-toastify';
import EditMovieTicket from './components/EditMovieTicket';

import LoginPage from './view/login_page';
import AddMoviePage from './view/AddMoviePage';
import ListMoviePage from './view/ListMoviePage';
import CreateAccount from './view/Account/CreateAccount';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/listmovie">
                        <Route path=":id" element={<EditMovieTicket />} />
                        <Route index element={<ListMoviePage />} />
                    </Route>
                    <Route path="/listmovie1">
                        <Route path=":id" element={<EditMovieTicket />} />
                        <Route index element={<Listmovie />} />
                    </Route>
                    <Route path="/addmovie">
                        <Route path=":id" element={<AddMoviePage />} />
                        <Route index element={<AddMoviePage />} />
                    </Route>
                    <Route path="/addmovie1" element={<EditMovieTicket />} />
                    <Route path="/createAccount" element={<CreateAccount />} />
                    <Route path="/overviewAccount" />
                </Routes>
            </BrowserRouter>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            {/* Same as */}
            <ToastContainer />
        </div>
    );
}

export default App;
