import axios from '../../axios';
import { config } from '../../utility/axiosconfig';
// import { base_url } from '../../utils/baseUrl';

const handleCreateMovie = async (movie) => {
    console.log('handleCreateMovie : ', movie);
    const response = await axios.post('/movie/stream_platform/', movie, config);
    return response;
};

const movieService = {
    handleCreateMovie,
};

export default movieService;
