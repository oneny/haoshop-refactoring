import styled from 'styled-components';

type TImgContainer = {
  ratio: string;
}

export const ImgConatiner = styled.div<TImgContainer>`
  display: block;
  padding-top: ${(props) => props.ratio};
  position: relative;
  overflow: hidden;
`

export const Img = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  object-fit: cover;
  top: 0;
  left: 0;
`