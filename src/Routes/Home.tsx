import { useQuery } from "@tanstack/react-query";
import {
  latestMoviesQueryOption,
  nowPlayingQueryOption,
  upcomingMoviesQueryOption,
} from "../api";
import styled from "styled-components";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useMemo } from "react";
import { useMatch } from "react-router-dom";
import Banner from "../Components/Banner";
import Slider from "../Components/Slider";
import Overlay from "../Components/Overlay";
import { useAtomValue } from "jotai";
import { clickedMovieState } from "../atom";

const Wrapper = styled.div`
  background: black;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Header = styled.div`
  color: white;
  padding: 5px;
  font-size: 20px;
`;

const offset = 6;

function Home() {
  const { data: nowPlaying, isLoading: isNowPlayingLoading } = useQuery(
    nowPlayingQueryOption,
  );
  const { data: latestMovies, isLoading: isLatestMoviesLoading } = useQuery(
    latestMoviesQueryOption,
  );
  const { data: upcomingMovies, isLoading: isUpcomingMoviesLoading } = useQuery(
    upcomingMoviesQueryOption,
  );

  const movieRecord = {
    nowPlaying: nowPlaying,
    latestMovies: latestMovies,
    upcomingMovies: upcomingMovies,
  };

  const bigMovieMatch = useMatch("/movies/:movieId");
  const movieId = bigMovieMatch?.params.movieId;

  const { clickedCategory, clickedMovie } = useAtomValue(clickedMovieState);

  if (isNowPlayingLoading || !nowPlaying) {
    return (
      <Wrapper>
        <Loader>Loading...</Loader>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <>
        {nowPlaying && <Banner movies={nowPlaying} />}
        <Header>Now Playing</Header>
        {nowPlaying && (
          <Slider category="nowPlaying" movies={nowPlaying} offset={offset} />
        )}
        <Header>Latest Movies</Header>
        {latestMovies && (
          <Slider
            category="latestMovies"
            movies={latestMovies}
            offset={offset}
          />
        )}
        <Header>Upcoming Movies</Header>
        {upcomingMovies && (
          <Slider
            category="upcomingMovies"
            movies={upcomingMovies}
            offset={offset}
          />
        )}

        <AnimatePresence>
          {bigMovieMatch && clickedMovie && clickedCategory ? (
            <Overlay
              basePath="/"
              category={clickedCategory}
              movie={clickedMovie}
            />
          ) : null}
        </AnimatePresence>
      </>
    </Wrapper>
  );
}

export default Home;
