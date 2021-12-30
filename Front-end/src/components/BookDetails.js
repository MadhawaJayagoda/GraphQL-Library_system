import React, { useState } from "react";
import { graphql } from 'react-apollo';  
import {flowRight as compose} from 'lodash';
import { getBookQuery } from "../queries/queries";
import BookList from "./BookList";
import "../components/css/BookDetails.css";

const BookDetails = (props) => {
    const displayBookDetails = () => {
        const { book } = props.data;
        console.log("Book details from BookDetails: ", book);
		
        if (book) {  
            return ( 
                <div>
                    <h2> { book.name } </h2>
                    <br/>
                    <p> {book.genre }</p>
                    <p> { book.author.name } </p>
                    <p> All other books by the Author: </p>
                    <ul className="other-books">
                        {
                            book.author.book.map((item) => {
                                return <li key={item.id} > {item.name} </li>                           })
                        }    
                    </ul>                    
                </div>
            )
        } else {
            return (
                <div> No book selected ... </div>
            )
        }
    }

    return (  
        <div id="book-details">
            { displayBookDetails() }
        </div>
    );
}
 
export default graphql(getBookQuery, {
    options: (props) => {
        return {
            variables: {
                id: props.book
            }
        }
    }
})(BookDetails);    
