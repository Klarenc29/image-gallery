import React, { useState, useEffect } from 'react'
import axios from 'axios';

import { Form, Button, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

const ImageForm = () => {

    const categoriesUrl = 'http://localhost:5000/api/categories';
    const imagesUrl = 'http://localhost:5000/api/images';

    const [categories, setCategories] = useState([]);

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState(null);
    const [keywords, setKeywords] = useState('');
    const [image, setImage] = useState(null);

    let navigate = useNavigate();

    useEffect(() => {
            getCategories();
        }, []);
    
    const getCategories = () => {
            axios.get(categoriesUrl)
            .then((res) => {
                setCategories(res.data);
            }).catch((err) => {
                console.log(err);
            })
        }

    const onFormSubmit = (e) => {
        e.preventDefault();
        const newImage = new FormData();
        newImage.append('title', title);
        newImage.append('category', category);
        newImage.append('keywords', keywords);
        newImage.append('image', image);
        axios.post(imagesUrl, newImage)
        .then((res) => {
            console.log(res.data);
            navigate('/my-gallery');
        })
        .catch((err) => console.log(err));
    }

  return (
    <Container>
        <Form onSubmit={onFormSubmit} encType="multipart/form-data">
            <Form.Group className="mb-3" controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Enter title" onChange={(e) => setTitle(e.target.value)} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="category">
                <Form.Label>Category</Form.Label>
                <Form.Select onChange={(e) => setCategory(e.target.value)} required>
                    <option value={null}>Choose Category</option>
                    {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="keywords">
                <Form.Label>Keywords</Form.Label>
                <Form.Control type="text" placeholder="Enter keywords (separate by column)" onChange={(e) => setKeywords(e.target.value)} required />
            </Form.Group>

            <Form.Group controlId="image" className="mb-3">
                <Form.Label>Image</Form.Label>
                <Form.Control type="file" onChange={(e) => setImage(e.target.files[0])} required />
            </Form.Group>

            <Button variant="primary" type="submit">
                Save
            </Button>
        </Form>
    </Container>
    
  )
}

export default ImageForm