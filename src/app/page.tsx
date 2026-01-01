import { Header } from '@/components/header';
import HourGlass from '@/components/hourglass';

const Homepage = () => {
  return (
    <div
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(0,0,0,0.5), rgba(0,0,0,0.75)), url('./bg_1.png')",
        backgroundColor: 'rgba(0, 0, 0)',
      }}
      className='w-full h-screen bg-cover bg-center'
    >
      <Header />
      <HourGlass />
    </div>
  );
};

export default Homepage;
