import Image from 'next/image';
import * as S from './style';

type ImgBoxProps = {
  src: string;
  alt: string;
  ratio: string;
};

export const ImgBox = ({ src, alt, ratio }: ImgBoxProps) => {
  return (
    <S.ImgConatiner ratio={ratio}>
      <Image src={src} alt={alt} fill sizes='100%' />
    </S.ImgConatiner>
  );
};
