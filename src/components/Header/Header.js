import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

const Header = (props) => {
    const categoriesUrl = 'http://localhost:5000/api/categories';

    const [searchTerm, setSearchTerm] = useState('');
    const [perPage, setPerPage] = useState(15);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState('');

    const pageOptions = [
        {
            "value": 25,
            "text": "25"
        },
        {
            "value": 50,
            "text": "50"
        },
        {
            "value": 75,
            "text": "75"
        }
    ];

    useEffect(() => {
        getCategories();
    }, []);

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

    const changeCategory = (value) => {
        setCategory(value);
        props.changeCategory(value);
    }

    const clear = () => {
        setSearchTerm('');
        props.search('');
        props.changeCategory(null);
        props.changePage(1);
    }

    const getCategories = () => {
        axios.get(categoriesUrl)
        .then((res) => {
            setCategories(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }
    
  return (
      <>
    {location.pathname !== '/my-gallery/new' && <Wrapper>
        <Title>
            <h1>
            { location.pathname === '/pexels' ? 'Pexels ' : (location.pathname === '/imgur' ? 'Imgur ' : 'My ') }
                Image Gallery
            </h1>
            {location.pathname === '/my-gallery' && 
                <AddButton>
                    <i className="fa-solid fa-plus"></i>
                    <Link to="/my-gallery/new"> Image</Link>
                </AddButton>}
            
                {
                location.pathname === '/pexels' ? 
                <ButtonGroup>
                    <p>
                        <Link to="/imgur">Search Imgur</Link>
                        <i className="fa-solid fa-angle-right"></i>
                    </p>
                    <p>
                        <Link to="/my-gallery">Search My Gallery</Link>
                        <i className="fa-solid fa-angle-right"></i>
                    </p>
                </ButtonGroup>
                : (
                    location.pathname === '/imgur' ?
                    <ButtonGroup>
                        <p>
                            <Link to="/pexels">Search Pexels</Link>
                            <i className="fa-solid fa-angle-right"></i>
                        </p>
                        <p>
                            <Link to="/my-gallery">Search My Gallery</Link>
                            <i className="fa-solid fa-angle-right"></i>
                        </p>
                    </ButtonGroup>
                    :
                    <ButtonGroup>
                        <p>
                            <Link to="/pexels">Search Pexels</Link>
                            <i className="fa-solid fa-angle-right"></i>
                        </p>
                        <p>
                            <Link to="/imgur">Search Imgur</Link>
                            <i className="fa-solid fa-angle-right"></i>
                        </p>
                    </ButtonGroup>
                )

                }
        </Title>
        <FiltersWrapper>
            {location.pathname === '/pexels' && 
                <SelectWrapper>
                    <label>Per Page</label>
                    <Select value={perPage} onChange={(e) => changePerPage(e.target.value)}>
                        {pageOptions.map(option => <option key={option.value} value={option.value}>{option.text}</option>)}
                    </Select>
                </SelectWrapper>
            }
            {location.pathname === '/my-gallery' && 
                <SelectWrapper>
                    <label>Category</label>
                    <Select value={category} onChange={(e) => changeCategory(e.target.value)}>
                        <option value={null}>Category</option>
                        {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                    </Select>
                </SelectWrapper>
            }
            <SearchWrapper onSubmit={search}>
                <SearchInput type="text" placeholder='Search...' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                <SearchButton type='submit' disabled={searchTerm === ''}>
                    <i className="fa-solid fa-magnifying-glass"></i>
                </SearchButton>
                <ClearButton type='button' onClick={clear}>
                    <i className="fa-solid fa-eraser"></i>
                </ClearButton>
            </SearchWrapper>
        </FiltersWrapper>
    </Wrapper>}
    {location.pathname === '/my-gallery/new' && <Wrapper>
        <Title style={{justifyContent: 'space-between'}}>
            <h1>Add New Image</h1>
            <BackButton>
                <i className="fa-solid fa-angle-left"></i>
                <Link to="/my-gallery"> Back</Link>
            </BackButton>
        </Title>
    </Wrapper>}
    </>
  )
}

const Wrapper = styled.div`
    padding: 30px;
`
const Title = styled.div`
    margin-bottom: 30px;
    display: flex;
    align-items: center;
    h1 {
        font-size: 24px;
        color: #222;
        font-weight: bold;
    }

    @media screen and (max-width: 768px){
        flex-direction: column;

        h1{
            margin-bottom: 20px;
        }
    }
    
`

const AddButton = styled.p`
        color: #fff;
        background-color: #007bff;
        font-weight: bold;
        padding: 10px 15px;
        border-radius: 5px;
        margin-left: 20px;

        a{
            color: #fff;
            text-decoration: none;
        }
        `

const BackButton = styled(AddButton)`
        float: right;
`

const ButtonGroup = styled.div`
    display: flex;
    flex: 1;
    justify-content: end;

    p {
        color: #fff;
        background-color: #007bff;
        font-weight: bold;
        padding: 10px 15px;
        border-radius: 5px;
        margin-right: 10px;

        a {
            color: #fff;
            text-decoration: none;
            margin-right: 10px;
        }
    }

    @media screen and (max-width: 480px){
        flex-direction: column;

        p{
            margin-bottom: 20px;
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
    border-radius: 10px;
    outline: none;
    padding: 10px;
`

const SelectWrapper = styled.div`
    width: 25%;
    display: flex;
    align-items: center;

    @media screen and (max-width: 768px){
        width: 40%;
    }
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
    border-radius: 10px;
    outline: none;
    padding: 10px 20px;
    margin-right: 10px;
`

const SearchButton = styled.button`
    border: none;
    outline: none;
    color: #fff;
    background-color: #007bff;
    border-radius: 10px;
    width: 40px;
    height: 40px;
    font-weight: bold;
    cursor: pointer;

    &:disabled {
        background-color: #6786a8;
        cursor: not-allowed;
    }
`
const ClearButton = styled(SearchButton)`
    background-color: #ccc;
    margin-left: 5px;
`


export default Header