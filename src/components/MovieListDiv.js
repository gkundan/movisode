import React from "react";
import styled from "styled-components";

const MovieContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  width: 250px;
  box-shadow: 0 3px 6px 0 #555;
  cursor: pointer;
  border-radius: 5px;
`;
const MovieName = styled.span`
  font-size: 19px;
  font-weight: 900;
  margin: 15px 0;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;
const CoverImage = styled.img`
  height: 320px;
  object-fit: cover;
`;
const InfoColumn = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const MovieInfo = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #555;
  text-transform: capitalize;
`;
const MovieListDiv = (props) => {
  const { Title, Year, imdbID, Type, Poster } = props.movie;
  return (
    <MovieContainer onClick={() => props.onMovieSelect(imdbID)}>
      <CoverImage src={Poster} />

      <MovieName>{Title} </MovieName>
      <InfoColumn>
        <MovieInfo>Year: {Year} </MovieInfo>
        <MovieInfo>Type: {Type}</MovieInfo>
      </InfoColumn>
    </MovieContainer>
  );
};

export default MovieListDiv;
