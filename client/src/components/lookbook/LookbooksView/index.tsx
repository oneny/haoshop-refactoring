import { ImgBox } from 'components';
import Link from 'next/link';
import { TLookbookViewProps } from 'types/lookbook';
import publicURL from 'utils/publicURL';
import * as S from './style';

const LookbooksView = ({ lookbooks, lastLookbookRef }: TLookbookViewProps) => {
  return (
    <main>
      <S.LookbookSection>
        <h2 className='ir'>HOW ABOUT OOTD 룩북 리스트</h2>
        <S.LookbooksList>
          {lookbooks?.pages.map(({ lookbooks }) =>
            lookbooks.map(({ _id, banners, name }, idx) =>
              lookbooks.length === idx + 1 ? (
                <li key={_id} ref={lastLookbookRef}>
                  <Link href={`/lookbooks/${_id}`}>
                    <ImgBox src={publicURL(banners[0].img)} alt='' ratio='150%' />
                    <S.LookbookName>{name}</S.LookbookName>
                  </Link>
                </li>
              ) : (
                <li key={_id}>
                  <Link href={`/lookbooks/${_id}`}>
                    <ImgBox src={publicURL(banners[0].img)} alt='' ratio='150%' />
                    <S.LookbookName>{name}</S.LookbookName>
                  </Link>
                </li>
              ),
            ),
          )}
        </S.LookbooksList>
      </S.LookbookSection>
    </main>
  );
};

export default LookbooksView;
