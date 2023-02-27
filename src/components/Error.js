import React from "react";
import styled from "styled-components";

const StyledParagraph = styled.p`
display: flex;
justify-content: center;
font-size: 20px;
font-size: bold;
`

export const Error = () => {
    return <StyledParagraph>Nothing found! Try again</StyledParagraph>
}