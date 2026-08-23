import styled from "styled-components";
import { motion, type Variants } from "motion/react";
import { makeImagePath } from "../utils";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { clickedMovieState } from "../atom";

const Wrapper = styled(motion.div)<{ offset: number }>`
  position: absolute;
  top: 0;
  left: 0;
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(${(props) => props.offset}, 1fr);
  width: 100%;
`;
const Box = styled(motion.div)<{ bgPath?: string }>`
  background-color: white;
  position: relative;
  height: 100px;
  cursor: pointer;
  ${(props) =>
    props.bgPath &&
    `background-image: url(${makeImagePath(props.bgPath, "w500")});`}

  background-size: cover;
  background-position: center;
  border-radius: 4px;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  pointer-events: none;
  position: absolute;
  bottom: 0px;
  background-color: rgba(0, 0, 0, 0.5);
  height: 20px;
  width: 100%;
  opacity: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  h4 {
    text-align: center;
    font-size: 10px;
    color: white;
  }
`;

const rowVars: Variants = {
  hidden: (isBack: boolean) => ({
    x: isBack ? -window.outerWidth : window.outerWidth,
  }),
  visible: {
    x: 0,
    transition: {
      type: "tween",
      duration: 1,
      ease: "easeInOut",
    },
  },
  exit: (isBack: boolean) => ({
    x: isBack ? window.outerWidth : -window.outerWidth,
    transition: {
      type: "tween",
      duration: 1,
      ease: "easeInOut",
    },
  }),
};

const boxVars: Variants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -50,
    transition: {
      delay: 0.2,
      type: "tween",
    },
    zIndex: 99,
  },
};

const infoVars: Variants = {
  hover: {
    opacity: 1,
  },
};

interface IRowProps {
  offset: number;
  movies: IMovie[];
  index: number;
  custom: boolean;
  category: string;
}

const Row = ({ offset, movies, index, category, custom }: IRowProps) => {
  const [clickedMovie, setClickedMovie] = useAtom(clickedMovieState);
  const navigate = useNavigate();
  const onBoxClicked = (movie: IMovie) => {
    setClickedMovie({ clickedCategory: category, clickedMovie: movie });
    navigate(`/movies/${movie.id}`);
  };

  return (
    <Wrapper
      custom={custom}
      offset={offset}
      variants={rowVars}
      initial="hidden"
      animate="visible"
      transition={{ type: "tween", duration: 1 }}
      exit="exit"
    >
      {movies &&
        movies.slice(offset * index, offset * index + offset).map((movie) => (
          <Box
            layoutId={category + String(movie.id)}
            onClick={() => onBoxClicked(movie)}
            bgPath={movie.backdrop_path || ""}
            key={category + String(movie.id)}
            variants={boxVars}
            initial="normal"
            whileHover="hover"
          >
            <Info variants={infoVars}>
              <h4>{movie.title}</h4>
            </Info>
          </Box>
        ))}
    </Wrapper>
  );
};

export default Row;
