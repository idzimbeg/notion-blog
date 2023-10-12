'use client';

import { IoMdArrowRoundUp } from 'react-icons/io';

import { Button } from '@/components/Button/Button';
import useScroll from '@/hooks/use-scroll';
import { isTouchDevice } from '@/utils';

export default function ScrollUpButton() {
  const { show, buttonRef } = useScroll();

  return (
    <Button
      ref={buttonRef}
      // variant={show ? 'scroll' : 'hidden'}
      className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-primary-extra text-2xl text-white opacity-70 transition-all duration-300 md:bottom-20 md:right-20 md:h-14 md:w-14 md:text-3xl ${
        !show && 'hidden'
      } ${!isTouchDevice() && 'hover:scale-110 hover:opacity-100'}`}
    >
      <IoMdArrowRoundUp />
    </Button>
  );
}
