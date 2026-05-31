import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Write from './pages/Write';
import PostDetail from './pages/PostDetail';
import EditPost from './pages/EditPost';


function App(){
return (
<BrowserRouter>
<Navbar />
<Routes>
<Route path="/" element={<Home />} />
<Route path="/post/:id" element={<PostDetail />} />
<Route path="/write" element={<Write />} />
<Route path="/edit/:id" element={<EditPost />} />
<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />
</Routes>
</BrowserRouter>
);
}


export default App;