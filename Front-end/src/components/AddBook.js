import React, { useState } from "react";
import { graphql } from 'react-apollo'; 
import {flowRight as compose} from 'lodash';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from "../queries/queries";
import "../components/css/AddBook.css";

const AddBook = (props) => {

    const [name, setBookName] = useState("");
    const [genre, setGenre] = useState("");    
    const [authorId, setAuthorId] = useState("");    

    const displayAuthors = () => {
        var data = props.getAuthorsQuery;

        if (data.loading) {
            return ( <option disabled> Loading Authors ... </option>);
        } else {
            return data.authors.map((author) => {
                return (<option key={author.id} value={author.id} >  {author.name} </option>)
            });
        }
    };

    const handleSubmitButtonClick = (e) => {
        e.preventDefault();

        props.addBookMutation({
            variables: {
                name: name,
                genre: genre,
                authorId: authorId
            }, 
            refetchQueries: [
                { query: getBooksQuery } 
            ]
        });
        setBookName("");
        setGenre("");
        setAuthorId("");
    }

    return (
        <form id="add-book" onSubmit={handleSubmitButtonClick}>
            <div className="field">
                <label> Book name: </label>
                <input type="text" value={name} onChange={(e) => setBookName(e.target.value)} />
            </div>
            
            <div className="field">
                <label> Genre: </label>
                <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)}/>
            </div>
            
            <div className="field-author">
                <label> Author: </label>
                <select id="author" value={authorId} onChange={(e) => setAuthorId(e.target.value)} >
                    <option defaultValue > Select Author </option>
                    { displayAuthors() }
                </select>
            </div>

            <button type="submit"> + </button>
        </form>
    );
  };
  
  export default compose(
      graphql(getAuthorsQuery, {name: "getAuthorsQuery"}),
      graphql(addBookMutation, {name: "addBookMutation"})
  )(AddBook); 