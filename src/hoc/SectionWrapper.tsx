import { motion } from 'framer-motion';

import { styles } from '../styles';
import { staggerContainer } from '../utils';

const SectionWrapper = (Component: React.ComponentType, idName: string) => {
  const WrapperComponent: React.FC = () => (
    <motion.section
      variants={staggerContainer(0.25, 0.25)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className={`relative z-0 mx-auto max-w-7xl`}
    >
      <span className="hash-span" id={idName}>
        &nbsp;
      </span>

      <Component />
    </motion.section>
  );

  WrapperComponent.displayName = `SectionWrapper(${
    Component.displayName || Component.name || 'Component'
  })`;

  return WrapperComponent;
};
export default SectionWrapper;
