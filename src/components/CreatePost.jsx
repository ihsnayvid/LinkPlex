import react, { useState } from 'react';
import { FormGroup, FormControl, InputLabel, Input, Button, styled, Typography } from '@mui/material';
// import { createPost } from '../service/api.js';
import { createPost } from '../service/api';
import { useNavigate } from 'react-router-dom';

const initialValue = {
    // links: {name: '', link: ''},
    name: '',
    link: '',
    title: '',
    description: '',
    tags: ''
}

const Container = styled(FormGroup)`
    width: 50%;
    margin: 5% 0 0 25%;
    & > div {
        margin-top: 20px;
`;

const CreatePost = () => {
    const [post, setPost] = useState(initialValue);
    const { name, link, title, description, tags } = post;
    let navigate = useNavigate();

    const onValueChange = (e) => {
        setPost({...post, [e.target.name]: e.target.value})
    }

    const addPostDetails = async() => {
        await createPost(post);
        navigate('/');
    }

    return (
        <Container>
            <Typography variant="h4">Create New Post</Typography>

            <FormControl>
                <InputLabel htmlFor="my-input">Name</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='name' value={name} id="my-input" />
            </FormControl>

            <FormControl>
                <InputLabel htmlFor="my-input">Link</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='link' value={link} id="my-input" />
            </FormControl>

            <FormControl>
                <InputLabel htmlFor="my-input">Title</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='title' value={title} id="my-input"/>
            </FormControl>

            <FormControl>
                <InputLabel htmlFor="my-input">Description</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='description' value={description} id="my-input" />
            </FormControl>

            <FormControl>
                <InputLabel htmlFor="my-input">Tags</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='tags' value={tags} id="my-input" />
            </FormControl>

            <FormControl>
                <Button variant="contained" color="warning" onClick={() => addPostDetails()}>Create Post</Button>
            </FormControl>

        </Container>
    )
}

export default CreatePost;