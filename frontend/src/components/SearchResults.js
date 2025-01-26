import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

function SearchResults({ searchQuery }) {
    const [results, setResults] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    // Fetch results from the server
    const fetchResults = useCallback(async () => {
        if (!searchQuery) return;

        setIsLoading(true);
        try {
            const response = await axios.post("http://localhost:4000/api/search", {
                query: searchQuery,
                page,
                pageSize: 10,
            });

            setResults(response.data.questions || []);
            setTotalPages(Math.ceil((response.data.totalCount || 0) / 10));
        } catch (error) {
            console.error("Error fetching search results:", error.message);
        } finally {
            setIsLoading(false);
        }
    }, [searchQuery, page]);

    // Trigger fetchResults whenever searchQuery or page changes
    useEffect(() => {
        fetchResults();
    }, [fetchResults]);

    // Handle pagination
    const handlePageChange = (direction) => {
        if (direction === "next" && page < totalPages) {
            setPage((prevPage) => prevPage + 1);
        } else if (direction === "prev" && page > 1) {
            setPage((prevPage) => prevPage - 1);
        }
    };

    return (
        <div className="container-fluid py-md-5 flex-grow-1">
            <main>
                <div className="row py-md-5 text-center justify-content-center">
                    <div className="col-md-12 col-lg-6">
                        <div className="d-block justify-content-center fw-bold position-relative home-titl">
                            {isLoading ? (
                                <p>Loading...</p>
                            ) : results.length ? (
                                <>
                                    <ul>
                                        {results.map((result, index) => (
                                            <li key={index} className="mb-3">
                                                <h5>{result.title}</h5>
                                                <p>{result.description}</p>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="pagination mt-4 d-flex justify-content-between">
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => handlePageChange("prev")}
                                            disabled={page === 1}
                                        >
                                            Previous
                                        </button>
                                        <span>
                                            Page {page} of {totalPages}
                                        </span>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => handlePageChange("next")}
                                            disabled={page === totalPages}
                                        >
                                            Next
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <p>No results found for "{searchQuery}".</p>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default SearchResults;
