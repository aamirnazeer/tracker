'use client';

import Header from '@/app/header';
import { store } from '@/redux/store';
import { Provider } from 'react-redux';

export const metadata = {
  title: 'Tracker App',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <Header />
          {children}
        </Provider>
      </body>
    </html>
  );
}
