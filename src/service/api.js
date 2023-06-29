import axios from 'axios';

const API_URL = 'http://localhost:3002/posts';

export const createPost = async(data) => {
    try{
        return await axios.post(API_URL, data);
    }
    catch(e){
        console.log(e.message);
    }
}

export const getPosts = async() => {
    try{
        return await axios.get(API_URL);
    }
    catch(e){
        console.log(e.message);
    }
}