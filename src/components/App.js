import React, { Component } from "react";
//import axios from "axios";
import styled from "styled-components";
import { StyledHeader } from "./Header";
import { fetchImages } from "./api";
import { ImageGallery } from "./ImageGallery";
import { SearchBar } from "./SearchBar";
import { StyledButton } from "./Button";

const StyledApp = styled.div`
    display: grid;
  grid-template-columns: 1fr;
  grid-gap: 16px;
  padding-bottom: 24px;
`
const INITIAL_STATE = {
    images: [],
    isLoading: false,
    error: null,
    query: "",
    page: 1,
}

export class App extends Component {
    state = { ...INITIAL_STATE }

    handleSubmit = (evt) => {
        console.log(evt)
        console.log(evt.query)
        this.setState({ query: evt.query, page: 1 });
    }

    componentDidMount() {
        this.handleImagesRequest()
    }

    handleImagesRequest = async ({ searchQuery = this.state.query, currentPage = this.state.page } = {}) => {
        this.setState({ isLoading: true });
        console.log(searchQuery);
        console.log(currentPage);
        try {
            const images = await fetchImages({ inputValue: searchQuery, page: currentPage });
            this.setState({ images })
        } catch (error) {
            this.setState({ error: error.message })
        } finally {
            this.setState({ isLoading: false })
        }
    }

    handleClick = () => {
        const { query, page } = this.state;
        this.setState(prevState => ({ page: prevState.page + 1 }), () => {
            this.handleImagesRequest({ searchQuery: query, currentPage: page });
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.query !== this.state.query || prevState.page !== this.state.page) {
            this.handleImagesRequest({ searchQuery: this.state.query, currentPage: this.state.page })
        }
    }

    render() {
        console.log(this.state)
        const { images, isLoading, error } = this.state
        return (
            <StyledApp>
                <StyledHeader>
                    <SearchBar handleSubmit={this.handleSubmit} />
                </StyledHeader>
                <ImageGallery images={images} />
                {images.length > 0 && <StyledButton onClick={this.handleClick}>Load More</StyledButton>}
            </StyledApp>
        )
    }
}