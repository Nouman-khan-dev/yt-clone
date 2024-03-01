import React, { useState } from 'react';
import './Home.css';
import { Feed, Sidebar } from '../../Components';
//
export default function Home({ sidebar }) {
    const [category, setCategory] = useState(0);

    //
    return (
        <>
            <Sidebar
                sidebar={sidebar}
                category={category}
                setCategory={setCategory}
            />

            <div
                className={`container ${
                    sidebar ? '' : 'large-container'
                }`}>
                <Feed category={category} />
            </div>
        </>
    );
}
