import React, { PureComponent } from "react";
import styled from "styled-components";
import { StyledHeader } from "./Header";
import { fetchImages } from "./api";
import { ImageGallery } from "./ImageGallery";
import { SearchBar } from "./SearchBar";
import { StyledButton } from "./Button";
import { Loader } from "./Loader";
import { Error } from "./Error";

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

export class App extends PureComponent {
    state = { ...INITIAL_STATE }

    handleSubmit = (evt) => {
        this.setState({ query: evt.query, page: 1 });
    }

    componentDidMount() {
        if (this.state.query !== "") {
            this.handleImagesRequest()
        }
    }

    handleImagesRequest = async ({ searchQuery = this.state.query, currentPage = this.state.page } = {}) => {

        this.setState({ isLoading: true })

        try {
            const fetchedData = await fetchImages({ inputValue: searchQuery, page: currentPage });

            if (currentPage === 1) {
                this.setState({ images: fetchedData.hits })
            } else {
                console.log("Dodają się nowe")
                this.setState(prevState => ({ images: [...prevState.images, ...fetchedData.hits] }));

            }
        } catch (error) {
            this.setState({ error: error.message })
        } finally {
            this.setState({ isLoading: false })
        }
    }

    handleClick = () => {
        const { query, page, images } = this.state;
        console.log("Kliknęłam, powinien się zmieniać stan")

        this.setState(prevState => ({ page: prevState.page + 1, isLoading: true }), async () => {
            try {
                const newImages = await fetchImages({ inputValue: query, page: page + 1 })
                this.setState({ images: [...images, ...newImages] })
            } catch (error) {
                this.setState({ error: error.message })
            } finally {
                this.setState({ isLoading: false })
            }

        });
    }

    componentDidUpdate(prevProps, prevState) {
        // if (prevState.query !== this.state.query || prevState.page !== this.state.page) {
        //     window.scrollTo({ top: 0, behavior: "smooth" });
        //     this.handleImagesRequest({ searchQuery: this.state.query, currentPage: this.state.page })
        // }

        if (prevState.query !== this.state.query) {
            window.scrollTo({ top: 0, behavior: "smooth" });
            this.handleImagesRequest({ searchQuery: this.state.query, currentPage: this.state.page })
        }

        if (prevState.page !== this.state.page) {
            this.handleImagesRequest({ searchQuery: this.state.query, currentPage: this.state.page })
        }
    }

    render() {
        //console.log(this.state)
        const { images, isLoading, query } = this.state
        return (
            <StyledApp>
                <StyledHeader>
                    <SearchBar handleSubmit={this.handleSubmit} />
                </StyledHeader>
                <ImageGallery images={images} />
                {isLoading ? <Loader />
                    :
                    images.length > 0 &&
                    <StyledButton onClick={this.handleClick}>Load More</StyledButton>}
                {images.length === 0 && query && !isLoading && <Error />}
            </StyledApp>
        )
    }
}