import axios from '../../axios';
import { config } from '../../utility/axiosconfig';
// import { base_url } from '../../utils/baseUrl';

const handleCreateMovie = async (movie) => {
    const response = await axios.post('/movie/stream_platform/', movie, config);
    return response;
};

const handleGetAllMovies = async (id) => {
    const response = await axios.get(`/movie/liststream/${id}`, config);
    return response;
};

const handleGetDetailMovies = async (id) => {
    const response = await axios.get(`/movie/stream_platform/${id}`, config);
    return response;
};

const movieService = {
    handleCreateMovie,
    handleGetAllMovies,
    handleGetDetailMovies,
};

export default movieService;

// export let listMovies = [
//     {
//         id: 0,
//         watchlist: [
//             {
//                 id: 0,
//                 date_picker: '2023-07-01',
//                 time_show_date: 'string',
//                 price: 2147483647,
//                 website: 'string',
//                 active: true,
//                 create_date: '2023-07-01T11:12:35.568Z',
//                 platform: 0,
//             },
//         ],
//         stream_flatform_image: [
//             {
//                 id: 0,
//                 uid: 'string',
//                 name: 'https://firebasestorage.googleapis.com/v0/b/moviewebadmin.appspot.com/o/images%2F100423-eternals-16811150170881958369065.jpgc05d7cf8-e19c-4ec9-974c-7190db8e8571?alt=media&token=ee664f8c-0cac-45e9-baf2-e90719830676',
//                 description: 'string',
//                 file: 'string',
//                 event: 0,
//             },
//         ],
//         category_name: 'string',
//         subcategory_name: 'string',
//         title: 'string',
//         description: 'string',
//         sub_icon: 'string',
//         uid_sub_icon: 'string',
//         show_date: '2023-07-01',
//         time_show_date: 'string',
//         close_date: '2023-07-01',
//         time_close_date: 'string',
//         post_date: '2023-07-01',
//         post_time: 'string',
//         close_post_date: '2023-07-01',
//         close_post_time: 'string',
//         active: true,
//         create_date: '2023-07-01',
//         titleNoti: 'string1111',
//         summaryNoti: 'string',
//         number_of_connection: 2147483647,
//         approval: 'string',
//         status: true,
//         is_horizontal: true,
//         category: 0,
//         subcategory: 0,
//         broker: 0,
//         created_user: 0,
//     },
// ];
