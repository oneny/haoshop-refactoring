import { useInterval } from 'hooks';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
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
              <Image
                priority={idx < 3}
                src={`/images/mainbg${idx}.jpeg`}
                alt='HOW ABOUT OOTD 오프라인 매장 내부 모습'
                fill
                sizes='100%'
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
      </S.SlideList>
    </S.MastHeadContainer>
  );
};
