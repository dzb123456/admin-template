import React, { Suspense, lazy } from 'react';
import {Link , Route, Routes, Navigate } from 'react-router-dom'

//懒加载
const Home = lazy(() => import(/*webpackChunkName: 'home'*/'./view/Home'));
const About = lazy(() => import(/*webpackChunkName: 'about'*/'./view/About'));

function App(){
    return (
       <div>
           <h1>App</h1>

           <ul>
               <li>
                   <Link to="/home">Home</Link>
               </li>
               <li>
                   <Link to="/about">About</Link>
               </li>
           </ul>

          <Suspense fallback={<div>loading...</div>}>
              <Routes>
                  <Route path="/home" element={<Home/>}/>
                  <Route path="/about" element={<About/>}/>
              </Routes>
          </Suspense>
       </div>
    );
}

export default App;
