'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { utils } from '../../assets';
import Navbar from '../navbar/Navbar';
import NavLink from '@/components/header/nav-link';
import ThemeToggle from '@/components/theme-toggle';

const NAV_ITEMS = [
  { path: 'blog', name: 'Blog' },
  { path: 'projects', name: 'Projects' },
  { path: 'contact', name: 'Contact' },
];
export const navLinks = [
  {
    id: 'blog',
    title: 'Blog',
  },
  {
    id: 'projects',
    title: 'Projects',
  },
  {
    id: 'contact',
    title: 'Contact',
  },
];
const { close, menu } = utils;

export const Header = () => {
  const [active, setActive] = useState<string>('');
  const [toggle, setToggle] = useState<boolean>(false);
  return (
    <>
      {/* <Navbar /> */}
      <nav className="z-50 mx-10 mb-2 flex flex-row justify-between py-12 sm:flex-col md:flex-row">
        <Link
          href="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActive('');
            window.scrollTo(0, 0);
          }}
        >
          <Image
            src={utils.logo}
            alt="logo"
            className="h-10 w-10 object-contain"
          />
          <p className="flex cursor-pointer text-lg font-bold text-primary-base dark:text-primary-light">
            Welcome &nbsp;
            <span className="hidden sm:block">| Friend</span>
          </p>
        </Link>
        <div className="my-6 flex space-x-8 self-center md:my-0 md:self-auto">
          <ul className="hidden list-none space-x-8 sm:flex">
            {NAV_ITEMS.map((item) => (
              <li
                key={item.path}
                className="text-secondary hover:text-primary whitespace-nowrap py-2 text-lg font-medium transition-all duration-300"
              >
                <NavLink path={item.path}>{item.name}</NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-1 items-center justify-end sm:hidden">
          <Image
            src={toggle ? close : menu}
            alt="menu"
            className="h-7 w-7 cursor-pointer object-contain"
            onClick={() => setToggle(!toggle)}
          />
          <div
            className={`${
              !toggle ? 'hidden' : 'flex'
            } absolute right-7 top-20 z-10 mx-4 my-2 min-w-[180px] rounded-xl p-6 backdrop-blur-md`}
          >
            <ul className="mb-2 flex list-none flex-col items-start justify-end gap-4">
              {navLinks.map((link) => (
                <li
                  key={link.id}
                  className={`${
                    active === link.title
                      ? 'text-secondary-base dark:text-secondary-light'
                      : 'text-secondary-base dark:text-secondary-light'
                  } font-poppins cursor-pointer text-[16px] font-medium`}
                  onClick={() => {
                    setActive(link.title);
                    setToggle(!toggle);
                  }}
                >
                  <NavLink path={link.id}>{link.title}</NavLink>
                </li>
              ))}
            </ul>
            <div className="absolute right-2 top-4">
              <ThemeToggle />
            </div>
          </div>
        </div>
        <div className="hidden sm:absolute sm:right-10 sm:top-12 sm:block md:static">
          <ThemeToggle />
        </div>
      </nav>
    </>
  );
};
