'use client';

import Link from 'next/link';
import { Github } from 'lucide-react';

export function Header() {
  return (
    <header className='w-full p-8'>
      <div className='container flex h-14 max-w-screen-2xl m-auto items-center'>
        <div className='flex'>
          <h1 className='flex items-center'>
            <span className='text-4xl font-extrabold text-red-500 capitalize font-sans tracking-tight'>
              Rebind
            </span>
            <span className='text-4xl font-extrabold text-emerald-500 capitalize font-sans tracking-tight'>
              Hourglass
            </span>
          </h1>
        </div>
        <div className='flex flex-1 items-center justify-end space-x-2'>
          <nav className='flex items-center space-x-1'>
            <Link
              href='https://github.com/Rebind-io/hourglass'
              target='_blank'
              rel='noopener noreferrer'
            >
              <button className='text-emerald-300 backdrop-blur-lg transition duration-150 hover:text-white cursor-pointer'>
                <Github className='h-6 w-6' />
              </button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
