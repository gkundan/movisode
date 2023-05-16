import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";
import MovieListDiv from "./components/MovieListDiv";
import MoveInfoComponents from "./components/MoveInfoComponents";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: black;
  padding: 10px;
  box-shadow: 0 3px 6px 0 #555;
`;

const LogoName = styled.div`
  font-size: 25px;
  color: #fff;
  font-family: "Raleway", sans-serif;
  font-weight: 900;
`;

const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  background: rgb(255, 255, 255);
  width: 240px;
  padding: 10px;
  text-align: center;
  align-items: center;
  border-radius: 25px;
`;

const SearchInput = styled.input`
  color: #000;
  font-size: 13px;
  font-weight: 400;
  border: none;
  outline: none;
  margin-left: 10px;
`;

const MovieList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  justify-content: space-evenly;
  gap: 25px;
`;

const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Spinner = styled.i`
  font-size: 50px;
  color: #ccc;
`;

const LoadingText = styled.p`
  margin-left: 10px;
  font-size: 20px;
  color: #ccc;
`;

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMovie, onMovieSelect] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDefaultMovies = async () => {
      const response = await axios.get(
        "https://www.omdbapi.com/?s=avengers&type=movie&apikey=c87fce8d"
      );
      setSearchResults(response.data.Search || []);
      setLoading(false);
    };

    fetchDefaultMovies();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await axios.get(
        `https://www.omdbapi.com/?s=${searchTerm}&apikey=c87fce8d`
      );
      setSearchResults(response.data.Search || []);
      setLoading(false);
    };

    if (searchTerm) {
      fetchData();
    }
  }, [searchTerm]);

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Container>
      <Header>
        <LogoName>Movisode</LogoName>
        <SearchBox>
          <i className="fa fa-search"></i>
          <SearchInput
            placeholder="Find Your Own ..."
            value={searchTerm}
            onChange={handleSearchInputChange}
          />
        </SearchBox>
      </Header>
      {loading ? (
        <Loading>
          <Spinner className="fa fa-spinner fa-spin"></Spinner>

          <LoadingText>Loading movies...</LoadingText>
        </Loading>
      ) : selectedMovie ? (
        <MoveInfoComponents
          selectedMovie={selectedMovie}
          onMovieSelect={onMovieSelect}
        />
      ) : (
        <MovieList>
          {searchResults.length ? (
            searchResults.map((movie) => (
              <MovieListDiv
                key={movie.imdbID}
                movie={movie}
                onMovieSelect={onMovieSelect}
              />
            ))
          ) : (
            <p>No movies found</p>
          )}
        </MovieList>
      )}
    </Container>
  );
}

export default App;
