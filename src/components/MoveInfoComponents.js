import axios from "axios";
import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px 30px;
  justify-content: center;
  border-bottom: 1px solid #555;
`;

const CoverImage = styled.img`
  height: 320px;
  object-fit: cover;
`;

const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-left: 20px;
`;

const MovieName = styled.span`
  font-size: 19px;
  font-weight: 900;
  margin: 15px 0;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const MovieInfo = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #555;
  text-transform: capitalize;
  & span {
    opacity: 0.6;
  }
`;
const Close = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #000;
  background: #555;
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;
  opacity: 0.7;
  height: 20px;
`;

const Loading = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #000;
  /* background: #555; */
  padding: 8px;
  border-radius: 50%;
  cursor: default;
  opacity: 0.7;
  height: 20px;
`;

const MoveInfoComponents = (props) => {
  const [movieInfo, setMovieInfo] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { selectedMovie } = props;

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`https://www.omdbapi.com/?i=${selectedMovie}&apikey=c87fce8d`)
      .then((response) => {
        setMovieInfo(response.data);
        setIsLoading(false);
      });
  }, [selectedMovie]);

  console.log(selectedMovie);
  console.log(movieInfo);

  return (
    <Container>
      {isLoading ? (
        <Loading>Loading...</Loading>
      ) : (
        <>
          {movieInfo ? (
            <>
              <CoverImage src={movieInfo.Poster} alt="cover" />
              <InfoColumn>
                <MovieName>Movie: {movieInfo.Title}</MovieName>
                <MovieInfo>
                  ImDb Rating: <span>{movieInfo.imdbRating}</span>
                </MovieInfo>
                <MovieInfo>Year: {movieInfo.Year}</MovieInfo>
                <MovieInfo>Genre: {movieInfo.Genre}</MovieInfo>
                <MovieInfo>Language: {movieInfo.Language}</MovieInfo>
                <MovieInfo>Actors: {movieInfo.Actors}</MovieInfo>
              </InfoColumn>
              <Close onClick={() => props.onMovieSelect()}>X</Close>
            </>
          ) : (
            <p>Error: could not retrieve movie info</p>
          )}
        </>
      )}
    </Container>
  );
};

export default MoveInfoComponents;
