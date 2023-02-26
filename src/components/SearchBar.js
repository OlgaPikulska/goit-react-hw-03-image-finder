import React, { Component } from "react";
import styled from "styled-components";

const StyledForm = styled.form`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 600px;
  background-color: #fff;
  border-radius: 3px;
  overflow: hidden;
`

const StyledFormButton = styled.button`
  display: inline-block;
  width: 48px;
  height: 48px;
  border: 0;
  background-image: url('https://image.flaticon.com/icons/svg/149/149852.svg');
  background-size: 40%;
  background-repeat: no-repeat;
  background-position: center;
  opacity: 0.6;
  transition: opacity 250ms cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  outline: none;
  &:hover {
    opacity: 1;
  }
`

const StyledButtonLabel = styled.span`
position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  clip-path: inset(50%);
  border: 0;
`

const StyledInput = styled.input`
display: inline-block;
  width: 100%;
  font: inherit;
  font-size: 20px;
  border: none;
  outline: none;
  padding-left: 4px;
  padding-right: 4px;
  &::placeholder{
    font: inherit;
  font-size: 18px;
  }
`
const INITIAL_STATE = {
  query: "",
}

export class SearchBar extends Component {
  state = { ...INITIAL_STATE };

  handleChange = (e) => {
    const { query, value } = e.target;
    this.setState({ query: value })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    this.props.handleSubmit({ ...this.state })
    this.reset();
    //form.reset();
    // powyższa linijka usuwa zawartość inputa, można byłoby dodać w inpucie x, który usuwa zawartość na życzenie
  }

  reset = () => {
    this.setState({ ...INITIAL_STATE })
  }

  render() {
    return (
      <>
        <StyledForm onSubmit={this.handleSubmit}>
          <StyledFormButton type="submit">
            <StyledButtonLabel>Search</StyledButtonLabel>
          </StyledFormButton>
          <StyledInput
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="query"
            onChange={this.handleChange}
          />
        </StyledForm>
      </>
    )
  }
}