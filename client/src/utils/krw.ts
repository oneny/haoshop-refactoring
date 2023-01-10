const krw = (money: number) => 
  new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(money);

export default krw;