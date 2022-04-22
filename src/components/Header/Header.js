import React, { useState } from 'react'
import styled from 'styled-components'
import { useLocation, Link } from 'react-router-dom'

const Header = (props) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [perPage, setPerPage] = useState(15);

    const location = useLocation();

    const search = (e) => {
        e.preventDefault();
        props.search(searchTerm);
        props.changePage(1);
    }

    const changePerPage = (value) => {
        setPerPage(value);
        props.changePerPage(value);
    }

    const clear = () => {
        setSearchTerm('');
        props.search('random');
        props.changePage(1);
    }
    
  return (
    <Wrapper>
        <Title>
            <h1>
            { location.pathname === '/pexels' ? 'Pexels ' : 'Imgur '}
                Image Gallery
            </h1>
            <p>
                {
                location.pathname === '/pexels' ? 
                <Link to="/imgur">Search Imgur</Link>
                : <Link to="/pexels">Search Pexels</Link>
                }
                <i className="fa-solid fa-angle-right"></i>
            </p>
        </Title>
        <FiltersWrapper>
            {location.pathname === '/pexels' && 
                <SelectWrapper>
                    <label>Per Page</label>
                    <Select value={perPage} onChange={(e) => changePerPage(e.target.value)}>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                        <option value="25">25</option>
                    </Select>
                </SelectWrapper>
            }
            <SearchWrapper onSubmit={search}>
                <SearchInput type="text" placeholder='Search...' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                <SearchButton type='submit'>
                    <i className="fa-solid fa-magnifying-glass"></i>
                </SearchButton>
                <ClearButton type='button' onClick={clear}>
                    <i className="fa-solid fa-eraser"></i>
                </ClearButton>
            </SearchWrapper>
        </FiltersWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
    padding: 30px;
`
const Title = styled.div`
    margin-bottom: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    h1 {
        font-size: 24px;
        color: #222;
        font-weight: bold;
    }
    p {
        color: #fff;
        background-color: #007bff;
        font-weight: bold;
        padding: 10px 15px;
        border-radius: 5px;

        a {
            color: #fff;
            text-decoration: none;
            margin-right: 10px;
        }
    }
    
`

const FiltersWrapper = styled.div`
    display: flex;
    align-items: center;

    label{
        color: #222;
        font-weight: bold;
    }
`

const Select = styled.select`
    flex: 1;
    margin: 0 10px;
    height: 40px;
    border: none;
    background-color: #eee;
    border-radius: 30px;
    outline: none;
    padding: 10px;
`

const SelectWrapper = styled.div`
    width: 20%;
    display: flex;
    align-items: center;
`

const SearchWrapper = styled.form`
    display: flex;
    flex: 1;
`

const SearchInput = styled.input`
    height: 40px;
    width: 100%;
    border: none;
    background-color: #eee;
    border-radius: 30px;
    outline: none;
    padding: 10px 20px;
    margin-right: 10px;
`

const SearchButton = styled.button`
    border: none;
    outline: none;
    color: #fff;
    background-color: #007bff;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    font-weight: bold;
    cursor: pointer;
`
const ClearButton = styled(SearchButton)`
    background-color: #ccc;
    margin-left: 5px;
`


export default Header