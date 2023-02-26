import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
import { StyledHeader } from "./Header";
import { fetchImages } from "./api";
import { ImageGallery } from "./ImageGallery";
import { SearchBar } from "./SearchBar";

const StyledApp = styled.div`
display: grid;
  grid-template-columns: 1fr;
  grid-gap: 16px;
  padding-bottom: 24px;
`

export class App extends Component {
    state = {
        images: [],
        isLoading: false,
        error: null,
        query: "",
    }

    handleSubmit = (evt) => {
        console.log(evt)
        console.log(evt.query)
        this.setState({ query: evt.query })
    }

    componentDidMount() {
        this.handleImagesRequest()
    }

    handleImagesRequest = async (searchQuery = this.state.query) => {
        this.setState({ isLoading: true });

        try {
            const images = await fetchImages(searchQuery);
            this.setState({ images })
        } catch (error) {
            this.setState({ error: error.message })
        } finally {
            this.setState({ isLoading: false })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.query !== this.state.query) {
            this.handleImagesRequest(this.state.query)
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
            </StyledApp>
        )
    }
}
