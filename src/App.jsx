import React, { useState } from 'react';
import { Navbar } from './Components';
import { Route, Routes, useParams } from 'react-router-dom';
import Home from './pages/Home/Home';
import Video from './pages/Videos/Video';
import SearchResult from './pages/SearchResult/SearchResult';

function App() {
    const [sidebar, setSidebar] = useState(true);
    const [searchData, setSearchData] = useState('');
    const [isSearched, setIsSearched] = useState(false);

    return (
        <div>
            <Navbar
                searchData={searchData}
                setSearchData={setSearchData}
                setSidebar={setSidebar}
                isSearched={isSearched}
                setIsSearched={setIsSearched}
            />
            <Routes>
                <Route
                    path="/"
                    element={
                        <Home
                            isSearched={isSearched}
                            searchData={searchData}
                            sidebar={sidebar}
                        />
                    }
                />
                <Route
                    path={`/video/:categoryId/:videoId`}
                    element={<Video />}
                />
                <Route
                    path="/search"
                    element={
                        <SearchResult
                            isSearched={isSearched}
                            sidebar={sidebar}
                            searchData={searchData}
                        />
                    }
                />
            </Routes>
        </div>
    );
}

export default App;
