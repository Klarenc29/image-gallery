import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import GalleryItem from './GalleryItem'

import axios from 'axios'
import Pagination from '../Pagination/Pagination'

const Gallery = ({ searchTerm, perPage, pg }) => {

    const [url, setUrl] = useState('https://api.pexels.com/v1/search');
    const [photos, setPhotos] = useState([]);
    const [page, setPage] = useState(pg);
    const [totalResults, setTotalResult] = useState(0);

    useEffect(() => {
        getPhotos(url, searchTerm, perPage, pg);
    }, [searchTerm, pg, perPage, url, setUrl, setPage])

    const getPhotos = (url, searchTerm, perPage, page) => {
        axios.get(`${url}?query=${searchTerm}&per_page=${perPage}&page=${page}`, { headers: {'Authorization': '563492ad6f9170000100000172e40c73ea194f8589f3de8585118b13'}}
        ).then((res) => {
            setPage(res.data.page);
            setTotalResult(res.data.total_results);
            setPhotos(res.data.photos);
        }).catch((err) => {
            console.log(err);
        });
    }

    const goToPrev = () => {
        getPhotos(url, searchTerm, perPage, page-1);
    }

    const goToNext = () => {
        getPhotos(url, searchTerm, perPage, page+1);
    }
    
  return (
      <>
        <GalleryGrid>
            {
                photos.map(
                    photo => <GalleryItem key={photo.id} src={photo.src.portrait} alt={photo.alt} author={photo.photographer} liked={photo.liked} />
                )
            }
        </GalleryGrid>
        <Pagination prev={goToPrev} next={goToNext} page={page} total={totalResults} perPage={perPage} />
    </>
  )
}

const GalleryGrid = styled.div`
    padding: 0 30px;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 15px;
`

export default Gallery