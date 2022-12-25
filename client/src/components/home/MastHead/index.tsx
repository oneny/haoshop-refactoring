import * as S from './style';

export const MastHead = () => {
  return (
    <S.MastHeadContainer>
      <h3 className='ir'>mastHead</h3>
      <S.SlideList>
        <S.SlieItem>
          <S.SlideImg src='/assets/images/mainbg0.jpeg' alt='' />
          <S.MainTextBox>
            <S.MainText>HOW ABOUT OOTD</S.MainText>
            <S.SlideNumBox>
              0 <span>1</span>
            </S.SlideNumBox>
          </S.MainTextBox>

          <S.SlideBar>
            <span>View More</span>
          </S.SlideBar>
        </S.SlieItem>
      </S.SlideList>
    </S.MastHeadContainer>
  )
}
