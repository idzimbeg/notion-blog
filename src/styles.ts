interface StyleProps {
  paddingX: string;
  paddingY: string;
  padding: string;
  heroHeadText: string;
  heroSubText: string;
  sectionHeadText: string;
  sectionSubText: string;
  contactHeadText: string;
  contactSubText: string;
  bgImage: string;
}

const styles: StyleProps = {
  paddingX: 'sm:px-1 px-64',
  paddingY: 'sm:py-16 py-6',
  padding: 'sm:px-16 px-6 sm:py-16 py-10',
  bgImage: 'dark:bg-hero-pattern bg-cover bg-center bg-no-repeat p-0',
  heroHeadText:
    'font-black dark:text-primary-light text-primary-base lg:text-[80px] sm:text-[60px] xs:text-[50px] text-[40px] lg:leading-[98px] mt-2',
  heroSubText:
    'text-[#dfd9ff] font-medium lg:text-[30px] sm:text-[26px] xs:text-[20px] text-[16px] lg:leading-[40px]',
  sectionHeadText:
    'dark:text-primary-light text-primary-base font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]',
  sectionSubText:
    'sm:text-[18px] text-[14px] dark:text-secondary-light text-secondary-base uppercase tracking-wider ',
  contactHeadText:
    'text-primary-light font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]',
  contactSubText:
    'sm:text-[18px] text-[14px] text-secondary-light uppercase tracking-wider ',
};

export { styles };
