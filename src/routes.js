import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Movies from './pages/movies';
import Header from './pages/components';
import Favoritos from './pages/Favoritos';

import Erro from './pages/Erro';
function RoutesApp(){
    return(
        <BrowserRouter>
        <Header/>
            <Routes>
                <Route path='/' element={ <Home/> } />
                <Route path='/movies/:id' element={ <Movies/> } />
                <Route path='/favoritos' element={ <Favoritos/> } />



                <Route path='*' element={ <Erro/> } />
            </Routes>    
        </BrowserRouter>
    )
}

export default RoutesApp;