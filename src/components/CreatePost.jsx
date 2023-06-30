import React, { useState, useEffect } from 'react';
import { Box, TextareaAutosize, TextField, Button, Typography, styled } from '@mui/material';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../config/firebase";
import { db } from '../config/firebase';
import { getDocs, collection, addDoc } from 'firebase/firestore';



const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const FormBox = styled(Box)`
    width:50%;
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
    background:blue;
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
`
const SubmitButton = styled(Button)`
    width:80%;
    background:green;
    &:hover {
    background-color: darkgreen;
  }
`
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
  const [user, loading, error] = useAuthState(auth);
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

  const handleSubmit = async(e) => {
    e.preventDefault();

    try{

      const photo = auth?.currentUser?.photoURL;
      const name = auth?.currentUser?.displayName;
      const email = auth?.currentUser?.email;

      // console.log(auth?.currentUser);
      // console.log("photo URL is:", photo);

      setFormData((prevData) => ({
        ...prevData,
        photoURL: photo,
        name: name,
        email: email,
      }));
      
      if(formData.photoURL && formData.email && formData.name){
        //db insert
        await addDoc(postsCollectionRef, formData);
        console.log(formData);      
        
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


  return (
    <StyledBox>
      <Typography variant="h4">Create Post</Typography>
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

        {/* <Typography variant="h5">Tags</Typography> */}
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
        //   rowsMin={3}
        minRows={5}
          placeholder="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          sx={{ width: '100%', marginTop: '16px', resize: 'vertical' }}
        />

        <SubmitButton type="submit" variant="contained" color="primary" sx={{ marginTop: '16px' }}>
          Create Post
        </SubmitButton>
      </FormBox>
    </StyledBox>
  );
};

export default CreatePost;
