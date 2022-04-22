import React, { useState } from 'react'
import styled from 'styled-components'

const GalleryItem = (props) => {
    const [fullscreen, setFullScreen] = useState(false);

    const toggleFullscreen = () => {
        setFullScreen(!fullscreen);
    }

  return (
    <>
        <Wrapper>
            <ImageWrapper onClick={toggleFullscreen}>
                <Image src={props.src} alt={props.alt} />
            </ImageWrapper>
            <Footer>
                {props.author && <p>Photo by: <span>{props.author}</span></p>}
                {props.title && <p>Title: <span>{props.title}</span></p>}
            </Footer>
        </Wrapper>
        {fullscreen && 
            <FullScreenImage style={{ backgroundImage: `url(${props.src})`}}>
                <p onClick={toggleFullscreen}><i className="fa-solid fa-xmark"></i></p>
            </FullScreenImage>
        }
    </>
  )
}

const FullScreenImage = styled.div`
    background-size: cover;
    background-position: top;
    background-repeat: no-repeat;
    min-height: 100%;
    height: 300vh;
    width: 100%;
    z-index: 1000;
    position: absolute;
    top: 0;
    left: 0;
    cursor: pointer;

    p{
        color: #fff;
        float: right;
        margin: 20px;
        font-size: 24px;
    }
`

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    background-color: #f9fafc;
    border: solid 1px #eee;
`

const ImageWrapper = styled.div`
    width: 100%;
    cursor: pointer;
`

const Image = styled.img`
    width: 100%;
    height: 100%;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
`

const Footer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 10px;
    border-top: solid 1px #eee;

    p{
        color: #222;
    }

    span {
        font-weight: bold;
    }
`

export default GalleryItem