import { Routes, Route } from 'react-router-dom';
import UploadBlog from "./components/UploadBlog"
import BlogPage from './components/BlogPage';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Header from './components/Header';

function App() {

  return(
    <>
    <Header />
    
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/upload" element={<UploadBlog/>} />
      <Route path="/blog/:id" element={<BlogPage />} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register />} />
    </Routes>
    </>
  )
}

export default App;