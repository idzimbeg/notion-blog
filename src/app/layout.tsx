import 'katex/dist/katex.min.css';
import 'prismjs/themes/prism-tomorrow.css';
import 'react-notion-x/src/styles.css';

import { Header } from '@/components/header';
import Provider from '@/components/provider';
import ScrollUpButton from '@/components/scroll-up-button';
import '@/styles/globals.css';
import '@/styles/paginate.css';

export const metadata = {
  title: {
    default: 'Workshop',
    template: '%s | Workshop',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="eng">
      <body className="relative z-0 mb-20 flex w-full flex-col bg-primary-light text-primary-light dark:bg-primary-base dark:text-primary-base">
        <Provider>
          <Header />

          <div className="px-0">
            <main>{children}</main>
          </div>

          <div className="fixed bottom-12 right-10">
            <ScrollUpButton />
          </div>
        </Provider>
      </body>
    </html>
  );
}
