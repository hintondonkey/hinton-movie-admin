import axios from '../../axios';
import { config } from '../../utility/axiosconfig';
// import { base_url } from '../../utils/baseUrl';

const handleCreateCategory = async (category) => {
    const response = await axios.post('/lookup/category/', category, config);
    return response;
};

const handleListCategory = async () => {
    const response = await axios.get('/lookup/category/', config);
    return response;
};

const handleGetIdCategory = async (id) => {
    const response = await axios.get(`/lookup/category/${id}/`, config);
    return response;
};

const handleUpdateCategory = async (data) => {
    const response = await axios.patch(
        `/lookup/category/${data.id}`,
        data.values,
        config
    );
    return response;
};

const handleDeleteCategory = async (category) => {
    const response = await axios.post('/lookup/category/', category, config);
    return response;
};

const handleCreateSubCategory = async (category) => {
    console.log(category);
    const response = await axios.post(
        '/services/sub_category/',
        category,
        config
    );
    console.log(response);
    return response;
};

const categoryService = {
    handleCreateCategory,
    handleListCategory,
    handleGetIdCategory,
    handleUpdateCategory,
    handleDeleteCategory,
    handleCreateSubCategory,
};

export default categoryService;
