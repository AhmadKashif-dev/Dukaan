import { useState } from "react";
import React from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const SearchBox = () => {
  const [keyword, setKeyword] = useState("");
  const { id } = useParams();
  const history = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history(`/search/${keyword}`);
    } else {
      history("/");
    }
  };
  return (
    <Form onSubmit={submitHandler} inline style={{ display: "flex" }}>
      <FormControl
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="search Products"
        className="mr-sm-2 ml-sm-5 "
      ></FormControl>
      <Button type="submit" variant="outline-success" className="p-2">
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
