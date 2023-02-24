import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
import { Header } from "./Header";

export class App extends Component {
    state = {
        images: [],
        isLoading: false,
        error: null,
    }

    async componentDidMount() {
        this.setState({ isLoading: true });

        try {
            const images = await fetchImages("nature");
            this.setState({ images })
        } catch (error) {
            this.setState({ error })
        } finally {
            this.setState({ isLoading: false })
        }
    }

    render() {
        return (
            <Header />
        )
    }
}
