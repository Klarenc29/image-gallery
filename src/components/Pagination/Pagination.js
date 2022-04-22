import React from 'react'
import styled from 'styled-components'

const Pagination = ({ prev, page, next, total, perPage }) => {
  return (
    <ButtonGroup>
        {page > 1 && <Button onClick={prev}><i className="fa-solid fa-angles-left"></i> </Button>}
        <PageButton>{page}</PageButton>
        {page < total/perPage && <Button onClick={next}><i className="fa-solid fa-angles-right"></i> </Button>}
    </ButtonGroup>
  )
}

const ButtonGroup = styled.div`
    width: 100%;
    margin: 30px 0;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Button = styled.button`
    border: none;
    outline: none;
    background-color: #eee;
    color: #222;
    font-weight: bold;
    border-radius: 5px;
    padding: 10px 15px;
    cursor: pointer;
    margin-right: 3px;
`

const PageButton = styled(Button)`
    background-color: #007bff;
    color: #fff;
`

export default Pagination