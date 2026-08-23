import { queryOptions } from "@tanstack/react-query";

const ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

export const queryNowPlaying = async (): Promise<IMovie[]> => {
  const url =
    "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    if (error instanceof Error) {
      console.error("TMDB API rquest failed: ", error.constructor.name);
    } else {
      console.log("Non-defined Error: ", error);
    }
    throw error;
  }
};

export const nowPlayingQueryOption = queryOptions({
  queryKey: ["NowPlaying"],
  queryFn: queryNowPlaying,
  staleTime: Infinity,
  enabled: true,
});

const queryLatestMovies = async (): Promise<IMovie[]> => {
  const today = new Date();
  const twoMonthsAgo = new Date();
  const threeMonthsAgo = new Date();
  twoMonthsAgo.setMonth(today.getMonth() - 2);
  threeMonthsAgo.setMonth(today.getMonth() - 3);
  const formatDate = (date: Date) => date.toISOString().split("T")[0];
  const gteDate = formatDate(threeMonthsAgo);
  const lteDate = formatDate(twoMonthsAgo);

  const url = `https://api.themoviedb.org/3/discover/movie?language=en-US&region=KR&primary_release_date.gte=${gteDate}&primary_release_date.lte=${lteDate}&sort_by=popularity.desc`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    throw error;
  }
};

export const latestMoviesQueryOption = queryOptions({
  queryKey: ["LatestMovies"],
  queryFn: queryLatestMovies,
  staleTime: Infinity,
  enabled: true,
});

const queryUpcomingMovies = async (): Promise<IMovie[]> => {
  const url =
    "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    throw error;
  }
};

export const upcomingMoviesQueryOption = queryOptions({
  queryKey: ["UpcomingMovies"],
  queryFn: queryUpcomingMovies,
  staleTime: Infinity,
  enabled: true,
});

const queryTrendingTvShows = async (): Promise<ITvShow[]> => {
  const url = "https://api.themoviedb.org/3/trending/tv/day?language=en-US";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  };
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return data.results;
  } catch (error) {
    throw error;
  }
};

export const trendingTvShowsQueryOption = queryOptions({
  queryKey: ["TredningTvShows"],
  queryFn: queryTrendingTvShows,
  staleTime: Infinity,
  enabled: true,
});

const queryAiringToday = async (): Promise<ITvShow[]> => {
  const url =
    "https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  };
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return data.results;
  } catch (error) {
    throw error;
  }
};

export const airingTodayQueryOption = queryOptions({
  queryKey: ["AiringToday"],
  queryFn: queryAiringToday,
  staleTime: Infinity,
  enabled: true,
});

const queryPopularTvShows = async (): Promise<ITvShow[]> => {
  const url = "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  };
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return data.results;
  } catch (error) {
    throw error;
  }
};

export const popularTvShowsQueryOption = queryOptions({
  queryKey: ["PopularTvShows"],
  queryFn: queryPopularTvShows,
  staleTime: Infinity,
  enabled: true,
});

const queryTopRatedTvShows = async (): Promise<ITvShow[]> => {
  const url = "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  };
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return data.results;
  } catch (error) {
    throw error;
  }
};

export const topRatedTvShowsQueryOption = queryOptions({
  queryKey: ["TopRatedTvShows"],
  queryFn: queryTopRatedTvShows,
  staleTime: Infinity,
  enabled: true,
});

const queryMovieByKeyword = async (keyword: string): Promise<IMovie[]> => {
  const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_keyword=${keyword}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  };
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return data.results;
  } catch (error) {
    throw error;
  }
};

export const movieByKeywordQueryOption = (keyword: string) =>
  queryOptions({
    queryKey: ["SearchMovieByKeyword", keyword],
    queryFn: () => queryMovieByKeyword(keyword),
    enabled: true,
  });

const queryTvShowByKeyword = async (keyword: string): Promise<ITvShow[]> => {
  const url = `https://api.themoviedb.org/3/search/movie?query=${keyword}&include_adult=false&language=en-US&page=1`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  };
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return data.results;
  } catch (error) {
    throw error;
  }
};

export const tvShowByKeywordQueryOption = (keyword: string) =>
  queryOptions({
    queryKey: ["SearchTvShowByKeyword", keyword],
    queryFn: () => queryTvShowByKeyword(keyword),
    enabled: true,
  });
