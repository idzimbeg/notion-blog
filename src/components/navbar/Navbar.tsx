'use client';

import Image from 'next/image';
import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import { utils } from '../../assets';
import ThemeToggle from '../theme-toggle';
import SectionWrapper from '@/hoc/SectionWrapper';

export const navLinks = [
  {
    id: 'about',
    title: 'About',
  },
  {
    id: 'work',
    title: 'Work',
  },
  {
    id: 'contact',
    title: 'Contact',
  },
];

const Navbar = () => {
  const [active, setActive] = useState<string>('');
  const [toggle, setToggle] = useState<boolean>(false);
  return (
    <nav
      className={`bg-primary flex w-full items-center justify-between px-16`}
    >
      <div className="z-50 mx-auto flex w-full max-w-7xl cursor-pointer items-center justify-between">
        <Link
          to="/"
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
          <p className="flex cursor-pointer text-[18px] font-bold text-white">
            Welcome &nbsp;
            <span className="hidden sm:block">| Friend</span>
          </p>
        </Link>
        <ul className="hidden list-none flex-row gap-10 sm:flex">
          {navLinks.map((link) => (
            <li
              key={link.id}
              className={`${
                active === link.title ? 'text-white' : 'text-secondary'
              } cursor-pointer text-[18px] font-medium hover:text-white`}
              onClick={() => setActive(link.title)}
            >
              <a href={`#${link.id}`}>{link.title}</a>
            </li>
          ))}
        </ul>
        <div className="flex flex-1 items-center justify-end sm:hidden">
          <Image
            src={toggle ? close : utils.menu}
            alt="menu"
            className="h-7 w-7 cursor-pointer object-contain"
            onClick={() => setToggle(!toggle)}
          />
          <div
            className={`${
              !toggle ? 'hidden' : 'flex'
            } black-gradient absolute right-0 top-20 z-10 mx-4 my-2 min-w-[140px] rounded-xl p-6`}
          >
            <ul className="flex list-none flex-col items-start justify-end gap-4">
              {navLinks.map((link) => (
                <li
                  key={link.id}
                  className={`${
                    active === link.title ? 'text-white' : 'text-secondary'
                  } font-poppins cursor-pointer text-[16px] font-medium`}
                  onClick={() => {
                    setActive(link.title);
                    setToggle(!toggle);
                  }}
                >
                  <a href={`#${link.id}`}>{link.title}</a>
                </li>
              ))}
            </ul>
            <div className="absolute right-[10vw] top-12 md:static">
              <ThemeToggle />
            </div>
          </div>
        </div>
        <div className="">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default SectionWrapper(Navbar, '');
