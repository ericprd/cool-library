'use client';

import { Dispatch, ReactNode, SetStateAction, createContext, useState } from 'react';
import { Navbar } from '../navbar';
import { Footer } from '../../footer';
import style from './Layout.module.scss';

type LayoutProps = {
  children: ReactNode;
}

export type GlobalContextProps = {
  searchBy: string;
  setSearchBy: Dispatch<SetStateAction<string>>
  searchParams: string;
  setSearchParams: Dispatch<SetStateAction<string>>
}

export const GlobalContext = createContext<GlobalContextProps | null>(null);

export function Layout(props: LayoutProps) {
  const { children } = props;

  const [searchBy, setSearchBy] = useState('intitle');
  const [searchParams, setSearchParams] = useState('');

  const { Provider } = GlobalContext;

  const providerValue: GlobalContextProps = {
    searchBy,
    searchParams,
    setSearchBy,
    setSearchParams,
  };

  return (
      <Provider value={providerValue}>
          <Navbar />
          <main className={style.main_container}>{children}</main>
          <Footer />
      </Provider>
  );
}
