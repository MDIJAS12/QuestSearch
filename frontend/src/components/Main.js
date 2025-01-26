import React, { useState } from 'react';
import SearchResults from './SearchResults';

function Main() {
    const [searchQuery, setSearchQuery] = useState('');
    const [submittedQuery, setSubmittedQuery] = useState('');

    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSubmit = () => {
        if (searchQuery.trim()) {
            setSubmittedQuery(searchQuery.trim());
        }
    };


    return (
        <>
            <div className="container-fluid py-md-5 flex-grow-1">
                <main>
                    <div className="row py-md-5 text-center justify-content-center">
                        <div className="col-md-12 col-lg-6">
                            <div className="d-block justify-content-center fw-bold position-relative home-title">
                                <div className="search-bar-container">
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={handleInputChange}
                                        placeholder="Search"
                                    />
                                    <button onClick={handleSubmit}>Search</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Render SearchResults component */}
                    {submittedQuery && <SearchResults searchQuery={submittedQuery} />}
                </main>
            </div>
        </>
    );
}

export default Main;

