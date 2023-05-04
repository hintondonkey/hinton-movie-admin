import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Listmovie from './components/ListMovie';
import AddMovieTicket from './components/AddMovieTicket';
import { ToastContainer } from 'react-toastify';
import EditMovieTicket from './components/EditMovieTicket';
import LoginPage from './view/login_page';
import AddMoviePage from './view/add_movie_page';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/listmovie">
                        <Route path=":id" element={<EditMovieTicket />} />
                        <Route index element={<Listmovie />} />
                    </Route>
                    <Route path="/addmovie" element={<AddMoviePage />} />
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
