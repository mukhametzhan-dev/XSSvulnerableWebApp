import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [search, setSearch] = useState('');
    const [searchResult, setSearchResult] = useState('');
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    // let clean = DOMPurify.sanitize('<div>hello</div>',{ALLOWED_TAGS: ['*'], ALLOWED_ATTR: ['style']});
    // Fetch comments
    useEffect(() => {
        axios.get('http://localhost:5000/api/comments').then((response) => {
            setComments(response.data);
        });
    }, []);

    // Handle search query (Reflected XSS)
    const handleSearch = () => {
        axios.get(`http://localhost:5000/api/search?q=${search}`).then((response) => {
          console.log(search);
          console.log(response.data.message);

            setSearchResult(response.data.message);
        });
    };

    // Handle adding new comments (Stored XSS)
    const handleAddComment = () => {
        axios
            .post('http://localhost:5000/api/comments', { comment: newComment })
            .then(() => {
                setComments([...comments, newComment]);
                setNewComment('');
            });
    };

    return (
        <div className="App">
            <h1>XSS Demo</h1>

            <section className="search-section">
                <h2>Reflected XSS</h2>
                <input
                    type="text"
                    placeholder="Enter search query"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
                <p
                    dangerouslySetInnerHTML={{
                        __html: searchResult,
                    }}
                />
            </section>

            <section className="comments-section">
                <h2>Stored XSS</h2>
                <ul>
                    {comments.map((comment, index) => (
                        <li
                            key={index}
                            dangerouslySetInnerHTML={{
                                __html: comment,
                            }}
                        />
                    ))}
                </ul>
                <input
                    type="text"
                    placeholder="Enter a comment"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <button onClick={handleAddComment}>Add Comment</button>
            </section>
        </div>
    );
}

export default App;