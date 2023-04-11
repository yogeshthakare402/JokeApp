import React, { useEffect, useState } from 'react';
import './Jokes.css';
import axios from 'axios';
import Card from './Card';
import BookmarkPage from './BookmarkPage';

function Home() {
    const [jokes, setJokes] = useState([]);
    const [jokesList, setJokesList] = useState([]);
    const [showJoke, setShowJoke] = useState(false);
    const [showBookmark, setShowBookmark] = useState(false)

    const getJokes = async () => {
        await axios.get("https://official-joke-api.appspot.com/random_joke")
            .then((res) => {
                // console.log(res.data)
                setJokes(res.data)
            })
            .catch((err) => console.log(err))
    };

    const giveRating = (rate, joke) => {
        // console.log(rate)
        // console.log(joke)
        //to create the array in localstorage at 1st
        // localStorage.setItem("jokeList",JSON.stringify([]))
        //nowadd kv to array
        let jokeList = JSON.parse(localStorage.getItem("jokeList"));
        if(jokeList){
            jokeList.push([rate, joke])
            localStorage.setItem("jokeList", JSON.stringify(jokeList));
            let list = JSON.parse(localStorage.getItem("jokeList"))
            setJokesList(list)
        }else{
            localStorage.setItem("jokeList",JSON.stringify([]))
            jokeList = JSON.parse(localStorage.getItem("jokeList"));
            jokeList.push([rate, joke])
            localStorage.setItem("jokeList", JSON.stringify(jokeList));
            let list = JSON.parse(localStorage.getItem("jokeList"))
            setJokesList(list)
        }
        
        console.log(jokesList)
        // localStorage.removeItem("joke")
    };
    useEffect(()=>{
        let list = JSON.parse(localStorage.getItem("jokeList"))
        setJokesList(list)
    },[]);

    const deleteJoke = (id)=>{
        // console.log(id);
        let list = jokesList.filter((item)=>item[1].id !== id)
        // console.log(list)
        localStorage.setItem("jokeList", JSON.stringify(list));
    };

    

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary border-bottom border-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Jokes App</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/bookmark" onClick={(e) => {
                                    e.preventDefault();
                                    setShowBookmark(true)}}>Bookmark Collection</a>
                            </li>
                            <li className="nav-item">
                                <button className="btn btn-success" href="/bookmark" onClick={() => {
                                    getJokes()
                                    setShowJoke(true)
                                }}>Generate Rndom Joke</button>
                            </li>
                        </ul>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Type</th>
                        <th scope="col">Setup</th>
                        <th scope="col">Punchline</th>
                        <th scope="col">Rating</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {jokesList && jokesList.map((item, i) => {
                        return <tr key={i}>
                            {/* {console.log(item)} */}
                            <th scope="row">{i + 1}</th>
                            <td>{item[1].type}</td>
                            <td>{item[1].setup}</td>
                            <td>{item[1].punchline}</td>
                            <td>{item[0]}/5</td>
                            <td><button type="button" className="btn btn-danger btn-sm" onClick={()=>{
                                // console.log(item[1].id);
                                deleteJoke(item[1].id)}}>Delete</button></td>
                        </tr>
                    })}

                </tbody>
            </table>

            {showJoke && <Card jokes={jokes} setShowJoke={setShowJoke} getJokes={getJokes} giveRating={giveRating} />}
            {showBookmark && <BookmarkPage setShowBookmark={setShowBookmark}/>}

        </div>
    )
}

export default Home