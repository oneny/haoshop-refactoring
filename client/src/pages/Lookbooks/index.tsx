import { ImgBox } from 'components';
import { useAppSelector } from 'hooks';
import { Link } from 'react-router-dom';
import { selectAllLookbooks } from 'store/slices/lookbookSlice';
import publicURL from 'utils/publicURL';
import * as S from './style';

export const Lookbook = () => {
  const lookbooks = useAppSelector(selectAllLookbooks);

  return (
    <main>
      <S.LookbookSection>
        <h3 className='ir'>HOW ABOUT OOTD 룩북 리스트</h3>
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
  )
}
