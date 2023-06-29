import axios from 'axios';

const API_URL = 'http://localhost:3002/posts';

const addPostAPI = async () => {
  const newBox = {
    title: newBoxTitle,
    links: [],
    description: newBoxDescription,
    tags: [],
  };

  try {
    const response = await axios.post(`${API_URL}`, newBox);
    const savedBox = response.data;
    setBoxes([...boxes, savedBox]);
    setNewBoxTitle('');
    setNewBoxDescription('');
  } catch (error) {
    console.log(error);
  }
};

const addLinkAPI = async (boxIndex) => {
  const newLink = {
    name: newLinkName,
    link: newLinkURL,
  };

  const box = boxes[boxIndex];
  const updatedBox = { ...box, links: [...box.links, newLink] };

  try {
    const response = await axios.put(`${API_URL}/${box.id}`, updatedBox);
    const updatedBoxes = [...boxes];
    updatedBoxes[boxIndex] = response.data;
    setBoxes(updatedBoxes);
    setNewLinkName('');
    setNewLinkURL('');
  } catch (error) {
    console.log(error);
  }
};

const DeletePostAPI = async (boxIndex) => {
  const box = boxes[boxIndex];

  try {
    await axios.delete(`${API_URL}/${box.id}`);
    const updatedBoxes = [...boxes];
    updatedBoxes.splice(boxIndex, 1);
    setBoxes(updatedBoxes);
  } catch (error) {
    console.log(error);
  }
};
// export const createPost = async(data) => {
//     try{
//         return await axios.post(API_URL, data);
//     }
//     catch(e){
//         console.log(e.message);
//     }
// }

// export const getPosts = async() => {
//     try{
//         return await axios.get(API_URL);
//     }
//     catch(e){
//         console.log(e.message);
//     }
// }