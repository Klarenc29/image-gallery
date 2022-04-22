import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import GalleryItem from './GalleryItem'

import axios from 'axios'

const ImgurGallery = ({ searchTerm }) => {

    const [url, setUrl] = useState('https://api.imgur.com/3/gallery/search/');
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        getPhotos(url, searchTerm);
    }, [searchTerm, url, setUrl])

    const getPhotos = (url, searchTerm) => {
        
        axios.get(`${url}?q=${searchTerm}`, { headers: {'Authorization': 'Client-ID a0e285112494a96'}}
        ).then((res) => {
            setPhotos(res.data.data);
        }).catch((err) => {
            console.log(err);
        });
    }

  return (
      <GalleryGrid>
           {
                photos?.filter(ph => ph.images && ph.images[0].type !== 'video/mp4').map(
                    photo => <GalleryItem key={photo.id} src={photo.images[0].link} alt={photo.description} title={photo.title} />
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
`

export default ImgurGallery