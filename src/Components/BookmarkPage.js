import React, {useState, useEffect } from 'react';

function BookmarkPage({setShowJoke, setShowBookmark }) {

    const [bookMark, setBookMark] = useState([]);

    console.log(bookMark);

    useEffect(()=>{
        let list = JSON.parse(localStorage.getItem("jokesBookmark"))
        setBookMark(list)
    },[]);

    const deleteBookmark = (id)=>{
        console.log(id)
        let list = bookMark.filter((item)=>item.id !== id)
        // console.log(list)
        localStorage.setItem("jokesBookmark", JSON.stringify(list));
    }
    
    return (
        <div className="card" style={{ "width": "25rem" }}>
            <div className="card-body">
                <div className='book-header'>
                <h3>Bookmark Jokes</h3>
                <button type='button' className='btn btn-danger' onClick={()=>setShowBookmark(false)}>X</button>
                </div>
                <tables className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Type</th>
                            <th scope="col">Setup</th>
                            <th scope="col">Punchline</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookMark && bookMark.map((item, i) => {
                            return <tr key={i}>
                                <th scope="row">{i + 1}</th>
                                <td>{item.type}</td>
                                <td>{item.setup}</td>
                                <td>{item.punchline}</td>
                                <td><button type='button' className='btn btn-danger' onClick={()=>{deleteBookmark(item.id)}}>Delete</button> </td>
                            </tr>
                        })}

                    </tbody>
                </tables>
            </div>
        </div>
    )
}

export default BookmarkPage