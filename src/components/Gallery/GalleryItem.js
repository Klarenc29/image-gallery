import React, { useState } from 'react'
import styled from 'styled-components'
import { Modal } from 'react-bootstrap'

const GalleryItem = (props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  return (
    <>
        <Wrapper>
            <ImageWrapper onClick={handleShow}>
                <Image src={props.src} alt={props.alt} />
            </ImageWrapper>
            <Footer>
                {props.author && <p>Photo by: <span>{props.author}</span></p>}
                {props.title && <p>Title: <span>{props.title}</span></p>}
            </Footer>
        </Wrapper>
        <Modal show={show} onHide={handleClose}>
            <Modal.Body>
                <Image src={props.src} alt={props.alt} />
            </Modal.Body>
        </Modal>
    </>
  )
}

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