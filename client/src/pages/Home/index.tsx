import { MastHead } from 'components';
import { useAuth } from 'hooks';

export const Home = () => {
  console.log(useAuth());
  return (
    <main>
      <MastHead />
    </main>
  );
};
