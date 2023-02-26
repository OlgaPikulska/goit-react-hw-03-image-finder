import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
import { Modal } from "./Modal";
import * as basicLightbox from 'basiclightbox'
import ReactDOMServer from 'react-dom/server';


const StyledGallery = styled.ul`
display: grid;
  max-width: calc(100vw - 48px);
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: 16px;
  margin-top: 0;
  margin-bottom: 0;
  padding: 0;
  list-style: none;
  margin-left: auto;
  margin-right: auto;
`
const StyledImageGalleryItem = styled.li`
border-radius: 2px;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
`
const StyledImage = styled.img`
width: 100%;
  height: 260px;
  object-fit: cover;
  transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);
  &:hover{
transform: scale(1.03);
  cursor: zoom-in;
  }
`
let instance;
const openLightbox = ({ largeImageURL, tags }) => {
  const content = `<div style="position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1200;">
    <div style="max-width: calc(100vw - 48px);
  max-height: calc(100vh - 24px);">
      <img src=${largeImageURL} alt=${tags} />
    </div>
  </div>`
  instance = basicLightbox.create(content)
  instance.show()
  console.log("lightbox clicked")
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    instance.close();
  }
});
// const handleClick = (e) => {
//   const { largeImageURL, tags } = e.target;

// }

export const ImageGallery = ({ images }) => {
  return (
    <StyledGallery>
      {images.map(({ id, webformatURL, largeImageURL, tags }) => (
        <StyledImageGalleryItem key={id}>
          <StyledImage src={webformatURL} alt={tags} onClick={() => openLightbox({ largeImageURL, tags })} />
        </StyledImageGalleryItem>
      ))}
    </StyledGallery>
  )
} 