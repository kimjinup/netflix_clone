import styled from "styled-components";
import { makeImagePath } from "../utils";

const Wrapper = styled.div<{ bgPhoto: string }>`
  height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 60px;
  background-image:
    linear-gradient(
      to right,
      rgba(0, 0, 0, 1),
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 1)
    ),
    url(${(props) => makeImagePath(props.bgPhoto)});
  background-size: cover;
  background-position: center;
`;

const Title = styled.h2`
  color: white;
  font-size: 48px;
`;
const Overview = styled.p`
  color: white;
  font-size: 16px;
  width: 50%;
`;

interface ITvBannerProps {
  tvShows: ITvShow[];
}

const TvBanner = ({ tvShows }: ITvBannerProps) => {
  return (
    <Wrapper
      bgPhoto={
        tvShows && tvShows[0] && tvShows[0].backdrop_path
          ? tvShows[0].backdrop_path
          : ""
      }
    >
      <Title>{tvShows && tvShows[0].original_name}</Title>
      <Overview>{tvShows && tvShows[0].overview}</Overview>
    </Wrapper>
  );
};

export default TvBanner;
