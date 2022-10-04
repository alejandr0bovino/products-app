import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import useGetDataFromApi from "../hooks/useGetDataFromApi";
import { API } from "../constants/constants";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { AiOutlineSearch } from "react-icons/ai";

function Search(props) {
  const { showSearch, onClose } = props;
  const data = useGetDataFromApi(`${API}/products`);
  const [search, setSearch] = useState("");

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const filteredProducts =
    data.loaded &&
    data.products.filter((product) => {
      return product.title.toLowerCase().includes(search.toLowerCase());
    });

  const inputRef = useRef(null);

  const handleClose = () => {
    onClose();
    inputRef.current.value = null;
    setSearch("");
  };

  return (
    <Modal
      show={showSearch}
      onHide={handleClose}
      scrollable
      className="theme-search"
    >
      <Modal.Header closeButton>
        <InputGroup>
          <InputGroup.Text id="basic-addon1">
            <AiOutlineSearch size="1.625rem" />
          </InputGroup.Text>
          <Form.Control
            aria-label="Search products"
            aria-describedby="basic-addon1"
            ref={inputRef}
            placeholder="Search products"
            onChange={handleSearch}
            className="form-control-lg"
            autoFocus
          />
        </InputGroup>
      </Modal.Header>

      <Modal.Body
        className={search !== "" ? "theme-search__modal-body-open" : ""}
      >
        {search !== "" && filteredProducts
          ? filteredProducts.map((item) => (
              <div key={item.id}>
                <Link to={`/product/${item.id}`} reloadDocument={true}>
                  <h5>{item.title}</h5>
                  <p>{item.description}</p>
                </Link>
              </div>
            ))
          : ""}
      </Modal.Body>
    </Modal>
  );
}

export default Search;
