import React, { useRef, useState } from 'react';
import {useInterval} from 'hooks';
import * as S from './style';

export const MastHead = () => {
  const [currentIdx, setCurrentIdx] = useState<number>(1);
  const slideRef = useRef<HTMLLIElement[]>([]);

  useInterval(() => {
    slideRef.current.forEach((item) => item.classList.remove('active'));
    slideRef.current[currentIdx].classList.add('active');
    setCurrentIdx((prev) => (prev >= 4 ? 0 : prev + 1));
  }, 4500);

  return (
    <S.MastHeadContainer>
      <h3 className='ir'>mastHead</h3>
      <S.SlideList>
        {Array.from({ length: 5 }).map((_, idx) => (
          <React.Fragment key={idx}>
            <S.SlieItem
              className={!idx ? 'active' : ''}
              ref={(ref) => (slideRef.current[idx] = ref as HTMLLIElement)}
            >
              <S.SlideImg
                src={`/assets/images/mainbg${idx}.jpeg`}
                alt=''
                loading={`${idx < 2 ? 'eager' : 'lazy'}`}
              />
              <S.MainTextBox>
                <S.MainText>HOW ABOUT OOTD</S.MainText>
                <S.SlideNumBox>
                  0 <span>{idx + 1}</span>
                </S.SlideNumBox>
              </S.MainTextBox>
            </S.SlieItem>
          </React.Fragment>
        ))}

        <S.SlideBar>
          <span>View More</span>
        </S.SlideBar>
      </S.SlideList>
    </S.MastHeadContainer>
  );
};
