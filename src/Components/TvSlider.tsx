import styled from "styled-components";
import { motion, AnimatePresence, type Variants } from "motion/react";
import { useState, useMemo } from "react";
import { useMatch } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "./Chevron";
import TvRow from "./TvRow";

const Wrapper = styled(motion.div)`
  position: relative;
  height: 130px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const Navigator = styled(motion.div)`
  height: 100px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.6);
  svg {
    width: 35px;
    transform: scaleY(2.5);
  }
`;

interface ISliderProps {
  tvShows: ITvShow[];
  offset: number;
  category: string;
}
const TvSlider = ({ tvShows, offset, category }: ISliderProps) => {
  const bigMovieMatch = useMatch("/movies/:movieId");

  const [leaving, setLeaving] = useState(false);

  const finishLeaving = () => {
    setLeaving(false);
  };

  const [index, setIndex] = useState(0);

  const maxIndex = useMemo(() => {
    if (!tvShows) return 0;
    const totalMovies = tvShows.length || 0;
    return totalMovies > 0
      ? Math.max(0, Math.ceil((totalMovies - 1) / offset) - 1)
      : 0;
  }, [tvShows]);

  const [back, setBack] = useState(false);

  const increaseIndex = () => {
    if (leaving) return;
    setBack(false);
    setIndex((current) => (current === maxIndex ? 0 : current + 1));
    setLeaving(true);
  };

  const decreaseIndex = () => {
    if (leaving) return;
    setBack(true);
    setIndex((current) => (current === 0 ? 0 : current - 1));
    setLeaving(true);
  };
  return (
    <Wrapper>
      <AnimatePresence
        initial={false}
        onExitComplete={finishLeaving}
        custom={back}
      >
        <Navigator onClick={decreaseIndex}>
          {index !== 0 && <ChevronLeft />}
        </Navigator>
        {tvShows && (
          <TvRow
            key={category + index}
            offset={offset}
            tvShows={tvShows}
            category={category}
            index={index}
            custom={back}
          />
        )}
        <Navigator onClick={increaseIndex}>
          {index !== maxIndex && <ChevronRight />}
        </Navigator>
      </AnimatePresence>
    </Wrapper>
  );
};

export default TvSlider;
