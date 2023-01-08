import * as S from './style';

type ImgBoxProps = {
  src: string;
  alt: string;
  ratio: string;
};

export const ImgBox = ({ src, alt, ratio }: ImgBoxProps) => {
  return (
    <S.ImgConatiner ratio={ratio}>
      <picture>
        <source
          srcSet={`${src.slice(0, src.lastIndexOf('.'))}.webp`}
          type='image/webp'
        />

        <S.Img src={src} alt={alt} />
      </picture>
    </S.ImgConatiner>
  );
};
