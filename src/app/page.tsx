import { Header } from '@/components/header';
import HourGlass from '@/components/hourglass';
import Link from 'next/link';

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
      <footer className='w-full p-4 text-center text-sm text-gray-300'>
        © {new Date().getFullYear()} Rebind Hourglass. All rights reserved by{' '}
        <Link
          href='https://github.com/Rebind-io/hourglass'
          target='_blank'
          rel='noopener noreferrer'
          className='text-emerald-500 hover:text-emerald-300'
        >
          mhShohan
        </Link>
        .
      </footer>
    </div>
  );
};

export default Homepage;
