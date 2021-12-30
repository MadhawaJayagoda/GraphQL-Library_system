import React, { useState } from "react";
import { graphql } from 'react-apollo'  // helps to bind apollo to react
import { getBooksQuery } from "../queries/queries";
import BookDetails from "./BookDetails";
import "../components/css/BookList.css";

const BookList = (props) => {


  const [selected, setSelected] = useState("");

  // Data from Query is stored in Props 
  // console.log(props);

  const displayBooks = () => {
      var data = props.data;
      if (data.loading) {
          return ( <div> Loading Books ... </div>);
      } else {
          return data.books.map((book) => {
              return (<li key={book.id} onClick={() => { setSelected(book.id) }}> { book.name }</li>)
          });
      }
  };
 

  return (
    <div>
      <ul id="book-list">
        { displayBooks() }
      </ul>

      <BookDetails book={selected} />
    </div>
  );
};

export default graphql(getBooksQuery)(BookList);   // Bind "getBooksQuery" to "BookList" component
