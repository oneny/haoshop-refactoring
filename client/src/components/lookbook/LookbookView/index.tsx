import { ImgBox, InfoBox } from 'components';
import { TLookbookProps } from 'types/lookbook';
import krw from 'utils/krw';
import publicURL from 'utils/publicURL';
import * as S from './style';

const LookbookView = ({ lookbook }: TLookbookProps) => {
  return (
    <S.LookbookContainer>
      <section>
        <h2 className='ir'>룩북 소개</h2>

        <S.LookbookContent>
          <S.LookbookTitle>{lookbook?.name}</S.LookbookTitle>
          <p>{lookbook?.description}</p>

          <S.LookbookImgList>
            {lookbook?.banners.map((banner, i) => (
              <li key={banner._id}>
                <ImgBox src={publicURL(banner.img)} alt={`룩북 ${i + 1}번째 사진`} ratio='150%' />
              </li>
            ))}
          </S.LookbookImgList>
        </S.LookbookContent>
      </section>
      <S.LookbookInfo>
        <h2 className='ir'>모델 및 상품 관련 정보</h2>

        <InfoBox title='모델 사이즈'>
          <p>{lookbook?.modelInfo}</p>
        </InfoBox>
        <InfoBox title='착용 사이즈'>
          {lookbook?.wearingSize.split('\n').map((wearing, i) => (
            <p key={i}>{wearing}</p>
          ))}
        </InfoBox>
        <InfoBox title='관련 상품'>
          <S.RelatedProductList>
            {lookbook?.products.map(({ _id, brand, name, discountPrice, productImgs }) => (
              <S.RelatedProductItem key={_id}>
                <S.ImgWrapper>
                  <ImgBox
                    src={publicURL(productImgs[0].fileName)}
                    alt={`${name} 상품 이미지`}
                    ratio='100%'
                  />
                </S.ImgWrapper>

                <S.RelatedProductInfo>
                  <S.RelatedProductBrand>{brand}</S.RelatedProductBrand>
                  <strong>{name}</strong>
                  <p>{krw(discountPrice)}</p>
                </S.RelatedProductInfo>
              </S.RelatedProductItem>
            ))}
          </S.RelatedProductList>
        </InfoBox>
      </S.LookbookInfo>
    </S.LookbookContainer>
  );
};

export default LookbookView;
