import styled, { keyframes } from 'styled-components';

const bar = keyframes`
  0% {
    width: 0%;
  }
`;

const transNum = keyframes`
  0% {
    opacity: 0;
    transform: translateY(1rem);
  }

  30% {
    opacity: 1;
    transform: translateY(0);
  }

  70% {
    opacity: 1;
    transform: translateY(0);
  }

  100% {
    opacity: 0;
    transform: translateY(-1rem);
  }
`;

const scalesImg = keyframes`
  0% {
    transform: scale(1.1);
  }
`;

const transArrowDown = keyframes`
  0% {
    opacity: 0;
  }
  
  30% {
    opacity: 1;
    bottom: 5%;
  }

  70% {
    opacity: 1;
    bottom: 5%;
  }

  100% {
    opacity: 0;
  }
`;

export const MastHeadContainer = styled.section`
  width: 100%;
  height: calc(100vh - 60px);
  font-weight: 700;
  color: ${({ theme }) => theme.palette.white};
  text-shadow: 0 5px 3px rgba(0, 0, 0, 0.4);

  @media screen and (max-width: ${({ theme }) => theme.breakpoint.sm}) {
    height: calc(100svh - 60px);
  }
`;

export const SlideList = styled.ul`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const SlieItem = styled.li`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
`;

export const SlideImg = styled.img`
  width: 100%;
  height: 100%;
  animation: ${scalesImg} 4.5s infinite;

  @media screen and (max-width: ${({ theme }) => theme.breakpoint.md}) {
    object-fit: cover;
  }
`;

export const MainTextBox = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 45%;
  right: 20%;
  width: max-content;

  @media screen and (max-width: ${({ theme }) => theme.breakpoint.md}) {
    align-items: center;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const MainText = styled.strong`
  display: block;
  font-size: 5rem;

  @media screen and (max-width: ${({ theme }) => theme.breakpoint.md}) {
    font-size: 4rem;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoint.sm}) {
    font-size: 3rem;
  }
`;

export const SlideNumBox = styled.div`
  position: relative;
  display: flex;
  font-size: 3rem;

  > span {
    position: relative;
    top: -1rem;
    display: inline-block;
    padding: 1rem 0.4rem;
    animation: ${transNum} 4.5s infinite;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoint.sm}) {
    font-size: 2.5rem;
  }
`

export const SlideBar = styled.div`
  position: absolute;
  left: 4%;
  bottom: 8%;
  font-size: 2rem;
  padding: 0 20% 1rem 0;

  &::after {
    content: '';
    width: 100%;
    height: 0.4rem;
    position: absolute;
    left: 0;
    bottom: 0;
    background-color: ${({ theme }) => theme.palette.white};
    animation: ${bar} 4.5s infinite;
  }

  > span {
    margin-left: 0.3rem;
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoint.md}) {
    display: none;
  }
`