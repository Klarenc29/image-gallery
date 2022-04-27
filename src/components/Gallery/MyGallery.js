import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import GalleryItem from './GalleryItem'

import axios from 'axios'

const MyGallery = ({ searchTerm, category }) => {

    const uploadsUrl = 'http://localhost:5000/uploads/';

    const [url, setUrl] = useState('http://localhost:5000/api/images');
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        getPhotos(url, searchTerm, category);
    }, [searchTerm, category, url, setUrl])

    const getPhotos = (url, searchTerm, category) => {

        let imagesUrl = `${url}?query=${searchTerm}`;

        if(category !== null){
            imagesUrl += `&category=${category}`;
        }
        
        axios.get(imagesUrl)
        .then((res) => {
            setPhotos(res.data);
        }).catch((err) => {
            console.log(err);
        });
    }



  return (
      <GalleryGrid>
           {
                photos?.map(
                    photo => <GalleryItem key={photo.filename} src={uploadsUrl+photo.filename} alt={photo.title} title={photo.title} />
                )
            }
      </GalleryGrid>
  )
}

const GalleryGrid = styled.div`
    padding: 0 30px;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 15px;

    @media screen and (max-width: 480px){
        grid-template-columns: repeat(2, 1fr);
    }

    @media screen and (min-width: 481px) and (max-width: 768px){
        grid-template-columns: repeat(3, 1fr);
    }

    @media screen and (min-width: 769px) and (max-width: 1024px){
        grid-template-columns: repeat(4, 1fr);
    }
`

export default MyGallery