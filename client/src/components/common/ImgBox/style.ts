import styled from 'styled-components';

type TImgContainer = {
  ratio: string;
}

export const ImgConatiner = styled.div<TImgContainer>`
  height: 0;
  overflow: hidden;
  padding-top: ${(props) => props.ratio};
  position: relative;
`;

export const Img = styled.img`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
`;