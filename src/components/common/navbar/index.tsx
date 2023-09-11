'use client';

import React, { ReactNode, useContext } from 'react';
import { FormValuesProps, SearchInput } from '../../search-input';
import style from './Navbar.module.scss';
import { useForm } from 'react-hook-form';
import { GlobalContext, GlobalContextProps } from '../layout';
import { useRouter } from 'next/router';
import { ArrowLeft, Bookmark, Home } from 'react-feather';
import { Icon } from 'react-feather';

export function Navbar() {
  const { searchBy } = useContext(GlobalContext) as GlobalContextProps;
  const { register, handleSubmit, reset } = useForm<FormValuesProps>({
    defaultValues: {
      search_params: '',
    },
  });
  const router = useRouter();

  function submitHandler(data: FormValuesProps) {
    const { search_params } = data;
    const refinedString = search_params.split(' ').join('+');

    router.push(`/result/?search_by=${searchBy}&search=${refinedString}&index_items=0&page=1&order_by=relevance`);
  }

  return (
    <nav className={style.navbar_container}>
      {router.asPath.includes('details') ? (
        <button type="button" className="flex gap-1 items-center p-2 rounded-md" onClick={() => router.back()}>
            <span>
                <ArrowLeft size={24} />
            </span>
            <span className="hidden md:inline-block">Back</span>
        </button>
      ) : null}

      <form className="w-full" onSubmit={handleSubmit(submitHandler)}>
        <SearchInput placeholder="Search..."
          register={register}
          name="search_params"
        />
      </form>



      <ButtonIcon icon={Home} onClick={() => {
        router.push('/');
        reset();
      }}>
        <span className="hidden md:inline-block">Home</span>
      </ButtonIcon>

      <ButtonIcon icon={Bookmark} onClick={() => router.push('/')}>
        <span className="hidden md:inline-block">Bookmark</span>
      </ButtonIcon>
    </nav>
  );
}

export function ButtonIcon({ icon, onClick, children } : {icon: Icon; onClick: () => void; children?: ReactNode}) {
  const IconComp = icon;
  return (
    <button className="flex items-center gap-2" onClick={onClick}>
      <IconComp />
      {children}
    </button>
  );
}

