import styled from "styled-components";
import { motion, useScroll, type Variants } from "motion/react";
import { makeImagePath } from "../utils";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const OverlayScreen = styled(motion.div)`
  opacity: 0;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
`;

const BigMovie = styled(motion.div)<{ positionY: number }>`
  position: absolute;
  top: ${(props) => props.positionY}px;
  left: 0;
  right: 0;
  width: 40%;
  height: fit-content;
  margin: 0 auto;
  background-color: rgba(0, 0, 0, 0.7);
`;

const BigCover = styled.div<{ bgPath: string }>`
  width: 100%;
  aspect-ratio: 2/1;
  background-size: cover;
  background-position: center center;
  background-image:
    linear-gradient(to top, black, transparent),
    url(${(props) => makeImagePath(props.bgPath, "w500")});
`;

const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 32px;
  margin-top: -80px;
`;

const BigOverview = styled.p`
  padding: 20px;
  font-size: 13px;
  color: ${(props) => props.theme.white.lighter};
`;

interface IOveralyProps {
  basePath: string;
  movie: IMovie;
  category: string;
}
const Overlay = ({ basePath, movie, category }: IOveralyProps) => {
  const { scrollY } = useScroll();
  const navigate = useNavigate();
  const goBase = () => {
    navigate(basePath);
  };
  return (
    <>
      <OverlayScreen
        onClick={goBase}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      ></OverlayScreen>

      <BigMovie
        onClick={goBase}
        positionY={scrollY.get() + 100}
        layoutId={category + String(movie.id)}
      >
        {movie && (
          <>
            <BigCover bgPath={movie.backdrop_path || ""} />
            <BigTitle>{movie.title}</BigTitle>
            <BigOverview>{movie.overview}</BigOverview>
          </>
        )}
      </BigMovie>
    </>
  );
};

export default Overlay;
