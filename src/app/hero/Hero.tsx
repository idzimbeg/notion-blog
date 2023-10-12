import { SectionWrapper } from '@/hoc';
import { styles } from '@/styles';

const Hero = () => {
  return (
    <>
      <section className="h-screen w-full px-8">
        <div className="absolute inset-0 top-[120px] mx-auto flex max-w-7xl flex-row items-start gap-5">
          <div className="mt-5 flex flex-col items-center justify-center">
            <div className="h-5 w-5 rounded-full bg-primary-extra" />
            <div className="violet-gradient h-40 w-1 sm:h-80" />
          </div>
          <div>
            <h1 className={`${styles.heroHeadText}`}>
              Some text <span className="text-primary-extra">Etc.</span>
            </h1>
            <p
              className={`${styles.heroSubText} mt-2 text-primary-base dark:text-primary-light`}
            >
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint
              omnis optio debitis qui obcaecati aperiam esse quae{' '}
              <br className="hidden sm:block" /> ea corrupti temporibus iusto at
              nostrum blanditiis officiis nihil, sequi est cupiditate excepturi!
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
