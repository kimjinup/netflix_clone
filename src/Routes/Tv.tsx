import { useQuery } from "@tanstack/react-query";
import {
  airingTodayQueryOption,
  latestMoviesQueryOption,
  nowPlayingQueryOption,
  popularTvShowsQueryOption,
  topRatedTvShowsQueryOption,
  trendingTvShowsQueryOption,
  upcomingMoviesQueryOption,
} from "../api";
import styled from "styled-components";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useMemo } from "react";
import { useMatch } from "react-router-dom";
import TvBanner from "../Components/TvBanner";
import TvSlider from "../Components/TvSlider";
import TvOverlay from "../Components/TvOverlay";
import { useAtomValue } from "jotai";
import { clickedMovieState, clickedTvShowState } from "../atom";

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

function Tv() {
  const { data: trendingTvShows, isLoading: isTrendingTvShowsLoading } =
    useQuery(trendingTvShowsQueryOption);
  const { data: airingTodayTvShows, isLoading: isAiringTodayTvShows } =
    useQuery(airingTodayQueryOption);
  const { data: popularTvShows, isLoading: isPopularTvShowsLoading } = useQuery(
    popularTvShowsQueryOption,
  );

  const { data: topRatedTvShows, isLoading: isTopRatedTvShowsLoading } =
    useQuery(topRatedTvShowsQueryOption);

  const movieRecord = {
    trendingTvShows: trendingTvShows,
    airingTodayTvShows: airingTodayTvShows,
    popularTvShows: popularTvShows,
    topRatedTvShows: topRatedTvShows,
  };

  const bigTvShowMatch = useMatch("/tv/:tvShowId");
  const tvShowId = bigTvShowMatch?.params.tvShowId;

  const { clickedCategory, clickedTvShow } = useAtomValue(clickedTvShowState);

  if (isTrendingTvShowsLoading || !trendingTvShows) {
    return (
      <Wrapper>
        <Loader>Loading...</Loader>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <>
        {trendingTvShows && <TvBanner tvShows={trendingTvShows} />}
        <Header>Tredning TV Shows</Header>
        {trendingTvShows && (
          <TvSlider
            tvShows={trendingTvShows}
            offset={offset}
            category="tredningTvShows"
          />
        )}
        <Header>Airing Today</Header>
        {airingTodayTvShows && (
          <TvSlider
            tvShows={airingTodayTvShows}
            offset={offset}
            category="airingTodayTvShows"
          />
        )}

        <Header>Popular TV Shows</Header>
        {popularTvShows && (
          <TvSlider
            tvShows={popularTvShows}
            offset={offset}
            category="popularTvShows"
          />
        )}

        <Header>Top Rated TV Shows</Header>
        {topRatedTvShows && (
          <TvSlider
            tvShows={topRatedTvShows}
            offset={offset}
            category="topRatedTvShows"
          />
        )}

        <AnimatePresence>
          {bigTvShowMatch && clickedTvShow && clickedCategory ? (
            <TvOverlay
              basePath="/tv"
              category={clickedCategory}
              tvShow={clickedTvShow}
            />
          ) : null}
        </AnimatePresence>
      </>
    </Wrapper>
  );
}

export default Tv;
