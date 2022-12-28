import * as S from './style';

export const Footer = () => {
  return (
    <S.FooterContainer>
      <S.ContactTitle>CONTACT</S.ContactTitle>
      <address>
        (주)HAO
        <br />
        서울시 강남구 역삼동
        <br />
        haoshoppingmall@gmail.com
      </address>
      <div className='footer-content-bottom'>
        <p>MON-SUN 9:00-18:00</p>
        <p>BREAKTIME 12:30-13:30</p>
      </div>
    </S.FooterContainer>
  );
};

