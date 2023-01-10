import { Footer, ImgBox } from 'components';
import { useAppSelector } from 'hooks';
import { Link } from 'react-router-dom';
import { selectAllLookbooks } from 'store/slices/lookbookSlice';
import publicURL from 'utils/publicURL';
import * as S from './style';

export const Lookbooks = () => {
  const lookbooks = useAppSelector(selectAllLookbooks);

  if (!lookbooks.length) return <p>Loading...</p>;

  return (
    <>
      <main>
        <S.LookbookSection>
          <h2 className='ir'>HOW ABOUT OOTD 룩북 리스트</h2>
          <S.LookbooksList>
            {lookbooks.map(({ id, banners, name }) => (
              <li key={id}>
                <Link to={`/lookbooks/${id}`}>
                  <ImgBox src={publicURL(banners[0].img)} alt='' ratio='150%' />
                  <S.LookbookName>{name}</S.LookbookName>
                </Link>
              </li>
            ))}
          </S.LookbooksList>
        </S.LookbookSection>
      </main>
      <Footer />
    </>
  );
};
