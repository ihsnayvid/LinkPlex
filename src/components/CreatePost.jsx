import React, { useState, useEffect } from 'react';
import { Box, TextareaAutosize, TextField, Button, Typography, styled } from '@mui/material';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../config/firebase";
import { db } from '../config/firebase';
import { getDocs, collection, addDoc } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css'


const StyledBox = styled(Box)`
  position:absolute;
  bottom:10px;
  left:50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background:#F1C27B;
  width:800px;
  height:90vh;
  overflow-y:scroll;
  scroll-behavior: smooth;
  scroll-snap-type: y mandatory;
  &::-webkit-scrollbar {
  width: 10px;
  height: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: #16FF00;
  }

  &::-webkit-scrollbar-track {
    background: #293462;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #9CFF2E;
  }
`;
const FormBox = styled(Box)`
    width:80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Title = styled(TextField)`
width:80%;
margin: 10px 0px;
`;
const StyledButtons = styled(Button)`
    width:80%;
    margin: 10px 0px;
    color:white;
    background:#2D4356;
`
const LinksBox = styled(Box)`
    margin: 10px 0px;
    width:80%;
`
const TagsBox = styled(Box)`
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    margin: 10px 0px;
    width:80%;
`
const DangerButton = styled(Button)`
    background:#E30B5C;
    &:hover {
    background-color: #FF3131;
  }
`
const DescriptionText= styled(TextareaAutosize)`
    width:80% !important;
    background:#F1C27B;
    border: 1px solid black;
    border-radius:5px;
`
const SubmitButton = styled(Button)`
    width:80%;
    background:#435B66;
    margin-bottom:10px;
    &:hover {
    background-color: darkgreen;
  }
`
const regex = /^(ftp|http|https):\/\/[^ "]+$/;
function validateLinks(array) {
  for (let i = 0; i < array.length; i++) {
    const link = array[i].link;
    const isLink = regex.test(link);
    if (!isLink) {
      return false; // Invalid link found
    }
  }
  return true; // All links are valid
}
const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    links: [],
    tags: [],
    photoURL: '',
    name: '',
    email: '',
  });
  const [user, loading, error] = useAuthState(auth)
  // console.log("error is ",user)
  const postsCollectionRef = collection(db, "Post");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  const handleLinkChange = (index, field) => (e) => {
    const { value } = e.target;
    setFormData((prevData) => {
      const links = [...prevData.links];
      links[index][field] = value;
      return {
        ...prevData,
        links,
      };
    });
};

const handleTagChange = (index) => (e) => {
  const { value } = e.target;
  setFormData((prevData) => {
      const tags = [...prevData.tags];
      tags[index] = value;
      return {
        ...prevData,
        tags,
      };
    });
  };
  useEffect(()=>{
      const photo = user?.photoURL;
      const name = user?.displayName;
      const email = user?.email;
      setFormData((prevData) => ({
        ...prevData,
        photoURL: photo,
        name: name,
        email: email,
      }))
  },[])
  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const photo = user?.photoURL;
      const name = user?.displayName;
      const email = user?.email;
      setFormData((prevData) => ({
        ...prevData,
        photoURL: photo,
        name: name,
        email: email,
      }));
      if(formData.links.length>0){
        const isValid = validateLinks(formData.links);
        if (!isValid) {
          toast.error('Error! Invalid link found', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
            return;
        }
      }
      else{
        toast.error('Error! Add atleast one link', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
          return;
      }
      if(formData.photoURL && formData.email && formData.name){
        console.log("post created");
        await addDoc(postsCollectionRef, formData);
        toast.success('Post Created', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
          }); 
          setTimeout(() => {
            navigate('/');
          }, 3000);
        }
      else{
          toast.error('Error! First Login', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
            setTimeout(() => {
              navigate('/login');
            }, 3000);
        }
      }
    catch(err){
      console.log(err);
    }

  };

  const handleAddLink = () => {
    setFormData((prevData) => ({
      ...prevData,
      links: [...prevData.links, { name: '', link: '' }],
    }));
  };

  const handleDeleteLink = (index) => {
    setFormData((prevData) => {
      const links = [...prevData.links];
      links.splice(index, 1);
      return {
        ...prevData,
        links,
      };
    });
  };

  const handleAddTag = () => {
    setFormData((prevData) => ({
      ...prevData,
      tags: [...prevData.tags, ''],
    }));
  };

  const handleDeleteTag = (index) => {
    setFormData((prevData) => {
      const tags = [...prevData.tags];
      tags.splice(index, 1);
      return {
        ...prevData,
        tags,
      };
    });
  };
  const navigate = useNavigate();


  return (
    <StyledBox>
      <Typography marginTop={2} style={{ textDecoration: 'underline' }} variant="h4">Create Post</Typography>
      <FormBox component="form" onSubmit={handleSubmit}>
        <Title
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        {formData.links.map((link, index) => (
          <LinksBox key={index} sx={{ display: 'flex', gap: '16px' }}>
            <TextField
              label="Name"
              value={link.name}
              onChange={handleLinkChange(index, 'name')}
              required
            />
            <TextField
              label="Link"
              value={link.link}
              onChange={handleLinkChange(index, 'link')}
              required
            />
            <DangerButton variant="contained" onClick={() => handleDeleteLink(index)}>
              Delete
            </DangerButton>
          </LinksBox>
        ))}
        <StyledButtons variant="contained" onClick={handleAddLink}>
          Add Links
        </StyledButtons>
        {formData.tags.map((tag, index) => (
          <TagsBox key={index} sx={{ display: 'flex', gap: '16px' }}>
            <TextField
              label="Tag"
              value={tag}
              onChange={handleTagChange(index)}
              required
            />
            <DangerButton variant="contained" onClick={() => handleDeleteTag(index)}>
              Delete
            </DangerButton>
          </TagsBox>
        ))}
        <StyledButtons variant="contained" onClick={handleAddTag}>
          Add Tags
        </StyledButtons>

        <DescriptionText
          minRows={5}
          placeholder="Description"
          name="description"
          color="#F1C27B"
          value={formData.description}
          onChange={handleChange}
          required
          sx={{ width: '100%', marginTop: '16px', resize: 'vertical' }}
        />

        <SubmitButton type="submit" variant="contained" color="primary" sx={{ marginTop: '16px' }}>
          Create Post
        </SubmitButton>
      </FormBox>
      <ToastContainer />
    </StyledBox>
  );
};

export default CreatePost;
