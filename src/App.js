import { useState } from 'react';
import { 
  BrowserRouter as Router,
  Navigate,
  Routes,
  Route
} from 'react-router-dom';
import './App.css';
import Gallery from './components/Gallery/Gallery';
import ImageForm from './components/Gallery/ImageForm';
import ImgurGallery from './components/Gallery/ImgurGallery';
import MyGallery from './components/Gallery/MyGallery';
import Header from './components/Header/Header';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [perPage, setPerPage] = useState(15);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState(null);

  return (
    <Router>
      <div className="App">
        <Header search={setSearchTerm} changePage={setPage} changePerPage={setPerPage} changeCategory={setCategory} />
        <Routes>
          <Route path="/" element={<Navigate replace to="/pexels" />} />
          <Route path="/pexels" element={<Gallery searchTerm={searchTerm} perPage={perPage} pg={page} />} />
          <Route path="/imgur" element={<ImgurGallery searchTerm={searchTerm} />} />
          <Route path="/my-gallery" element={<MyGallery searchTerm={searchTerm} category={category} />} />
          <Route path="/my-gallery/new" element={<ImageForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
