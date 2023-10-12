'use client';

import { useRef, useState } from 'react';

import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';

import { styles } from '../../styles';
import { Button } from '@/components/Button/Button';
import { EarthCanvas, StarsCanvas } from '@/components/canvas';
import { SectionWrapper } from '@/hoc';
import { slideIn } from '@/utils';

export const metadata = {
  title: 'Contact',
  description: 'This is contact page.',
};

const ContactPage = () => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const emailjsServiceKey = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_KEY;
  const emailjsTemplateKey = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_KEY;
  const emailjsUserKey = process.env.NEXT_PUBLIC_EMAILJS_USER_KEY;

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target as
      | HTMLInputElement
      | HTMLTextAreaElement;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!emailjsServiceKey || !emailjsTemplateKey || !emailjsUserKey) {
      console.error('EmailJS service key is undefined');
      return;
    }
    emailjs
      .send(
        emailjsServiceKey,
        emailjsTemplateKey,
        {
          from_name: form.name,
          to_name: 'Me',
          from_email: form.email,
          to_email: 'igordzimbeg@gmail.com',
          message: form.message,
        },
        emailjsUserKey
      )
      .then(
        () => {
          setLoading(false);
          alert('Thank you. I will get back to you as soon as possible.');

          setForm({
            name: '',
            email: '',
            message: '',
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);

          alert('Ahh, something went wrong. Please try again.');
        }
      );
  };

  return (
    <div className="relative z-0">
      <div
        className={`flex flex-col-reverse gap-10 overflow-hidden xl:mt-12 xl:flex-row`}
      >
        <motion.div
          variants={slideIn('left', 'tween', 0.2, 1)}
          className="flex-[0.75] rounded-2xl bg-secondary-dark p-8"
        >
          <p className={styles.contactHeadText}>Get in touch</p>
          <h3 className={styles.contactSubText}>Contact.</h3>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="mt-12 flex flex-col gap-8"
          >
            <label className="flex flex-col">
              <span className="mb-4 font-medium text-primary-light">
                Your Name
              </span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="What's your good name?"
                className="rounded-lg border-none bg-secondary-base px-6 py-4 font-medium text-primary-light outline-none placeholder:text-secondary-light"
              />
            </label>
            <label className="flex flex-col">
              <span className="mb-4 font-medium text-primary-light">
                Your email
              </span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="What's your web address?"
                className="rounded-lg border-none bg-secondary-base px-6 py-4 font-medium text-primary-light outline-none placeholder:text-secondary-light"
              />
            </label>
            <label className="flex flex-col">
              <span className="mb-4 font-medium text-primary-light">
                Your Message
              </span>
              <textarea
                rows={7}
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="What you want to say?"
                className="rounded-lg border-none bg-secondary-base px-6 py-4 font-medium text-primary-light outline-none placeholder:text-secondary-light"
              />
            </label>
            <Button variant="contact" type="submit">
              {loading ? 'Sending...' : 'Send'}
            </Button>
          </form>
        </motion.div>

        <motion.div
          variants={slideIn('right', 'tween', 0.2, 1)}
          className="h-[350px] md:h-[550px] xl:h-auto xl:flex-1"
        >
          <EarthCanvas />
        </motion.div>
      </div>

      <StarsCanvas />
    </div>
  );
};

export default SectionWrapper(ContactPage, 'contact');
