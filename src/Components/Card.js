import React from 'react'

function Card({jokes,setShowJoke, getJokes, giveRating}) {

    const addToBookmark = (jokes) => {
        console.log(jokes)
        // localStorage.setItem("jokesBookmark",JSON.stringify([]));
        let bookmarkList = JSON.parse(localStorage.getItem("jokesBookmark"));
        bookmarkList.push(jokes)
        localStorage.setItem("jokesBookmark", JSON.stringify(bookmarkList));
        // console.log(bookMark)
    };

    return (
        <div className="card" style={{ "width": "25rem" }}>
            <div className="card-body">
                <h2 className="card-text">Joke</h2>
                <div className="card-text">{jokes.setup}</div>
                <div className="card-text">{jokes.punchline}</div>
                <div className="card-text mt-5" >
                    <button type="button" className="btn btn-outline-success mr-3" onClick={() => {
                        getJokes();
                    }}>New Joke</button>
                    <button type="button" className="btn btn-outline-primary mr-4 ml-4" onClick={() => addToBookmark(jokes)}>Bookmark</button>
                    <button type="button" className="btn btn-outline-danger" onClick={() => setShowJoke(false)}>Close</button>
                </div>
                <div className='rating mt-4'>
                    <h4>Rate the Joke</h4>
                    <button type="button" className="btn btn-outline-success mr-3" onClick={()=>giveRating(1,jokes)}>1</button>
                    <button type="button" className="btn btn-outline-success mr-3" onClick={()=>giveRating(2,jokes)}>2</button>
                    <button type="button" className="btn btn-outline-success mr-3" onClick={()=>giveRating(3,jokes)}>3</button>
                    <button type="button" className="btn btn-outline-success mr-3" onClick={()=>giveRating(4,jokes)}>4</button>
                    <button type="button" className="btn btn-outline-success mr-3" onClick={()=>giveRating(5,jokes)}>5</button>
                </div>

            </div>
        </div>
    )
}

export default Card