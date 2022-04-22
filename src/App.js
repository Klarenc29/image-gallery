import { useState } from 'react';
import { 
  BrowserRouter as Router,
  Navigate,
  Routes,
  Route
} from 'react-router-dom';
import './App.css';
import Gallery from './components/Gallery/Gallery';
import ImgurGallery from './components/Gallery/ImgurGallery';
import Header from './components/Header/Header';

function App() {
  const [searchTerm, setSearchTerm] = useState('random');
  const [perPage, setPerPage] = useState(15);
  const [page, setPage] = useState(1);

  return (
    <Router>
      <div className="App">
        <Header search={setSearchTerm} changePage={setPage} changePerPage={setPerPage} />
        <Routes>
          <Route path="/" element={<Navigate replace to="/pexels" />} />
          <Route path="/pexels" element={<Gallery searchTerm={searchTerm} perPage={perPage} pg={page} />} />
          <Route path="/imgur" element={<ImgurGallery searchTerm={searchTerm} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
