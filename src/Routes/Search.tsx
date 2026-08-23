import { useLocation, useSearchParams } from "react-router-dom";
import { movieByKeywordQueryOption, tvShowByKeywordQueryOption } from "../api";
import { useQuery } from "@tanstack/react-query";
import TvSlider from "../Components/TvSlider";
import Slider from "../Components/Slider";
import styled from "styled-components";

const Wrapper = styled.div`
  position: fixed;
  top: 100px;
  width: 100%;
  background: black;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Header = styled.div`
  color: white;
  padding: 5px;
  font-size: 20px;
`;

function Search() {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const keyword = searchParams.get("keyword") || "";
  console.log("keyword: ", keyword);

  const { data: tvShows, isLoading: istvShowsLoading } = useQuery(
    tvShowByKeywordQueryOption(keyword),
  );

  const { data: movies, isLoading: isMoviesLoading } = useQuery(
    movieByKeywordQueryOption(keyword),
  );

  console.log(tvShows);
  const offset = 6;
  return (
    <Wrapper>
      <Header>Movies </Header>
      {movies && (
        <Slider
          movies={movies}
          offset={offset}
          category="movieBySearch"
        ></Slider>
      )}
      <Header>TV Shows</Header>
      {tvShows && (
        <TvSlider
          tvShows={tvShows}
          offset={offset}
          category="tvShowsBySearch"
        ></TvSlider>
      )}
    </Wrapper>
  );
}

export default Search;
