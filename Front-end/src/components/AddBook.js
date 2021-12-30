import React, { useState } from "react";
import { graphql } from 'react-apollo';  // helps to bind apollo to react
import {flowRight as compose} from 'lodash';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from "../queries/queries";
import "../components/css/AddBook.css";

const AddBook = (props) => {

    // State
    const [name, setBookName] = useState("");
    const [genre, setGenre] = useState("");    
    const [authorId, setAuthorId] = useState("");    

    const displayAuthors = () => {
        var data = props.getAuthorsQuery;

        // console.log("Authors from displayAuthors() method: ", data);

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

        // console.log("Book Name: ", name);
        // console.log("Book Genre: ", genre);
        // console.log("Book Author ID: ", authorId);

        props.addBookMutation({
            variables: {
                name: name,
                genre: genre,
                authorId: authorId
            }, 
            refetchQueries: [
                // Tell GraphQL or Apollo to Refetch a particular Query after the Mutation 
                { query: getBooksQuery } 
            ]
        });

        // Clear the fields 
        setBookName("");
        setGenre("");
        setAuthorId("");
    }

    console.log("Props from AddBook : ", props);

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