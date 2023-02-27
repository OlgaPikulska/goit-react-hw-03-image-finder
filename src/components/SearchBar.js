import React, { PureComponent } from "react";
import styled from "styled-components";
import { AiOutlineSearch } from "react-icons/ai"

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

export class SearchBar extends PureComponent {
  state = { ...INITIAL_STATE };

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ query: value })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.handleSubmit({ ...this.state })
    this.reset();
  }

  reset = () => {
    this.setState({ ...INITIAL_STATE })
  }

  render() {
    return (
      <>
        <StyledForm onSubmit={this.handleSubmit}>
          <StyledFormButton type="submit">
            <AiOutlineSearch size={20} />
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