import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Blogs from './components/Blogs';
import Blog from './components/Blog';

import AddBlogPage from './components/Addblog';
import BlogsLayout from './components/BlogsLayout';

function App() {
  return (
    <Router>
      {/* Common Navbar for all pages */}
      <Navbar />

      {/* Main content with routes */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path='/blogs' element={<BlogsLayout/>}>
          <Route index  element={<Blogs />}/>
          <Route path=":id" element={<Blog/>}></Route>
        </Route>
        <Route path="/addblog" element={<AddBlogPage/>}/>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
