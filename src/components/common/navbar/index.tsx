'use client';

import React, { useContext } from 'react';
import { FormValuesProps, SearchInput } from '../../search-input';
import style from './Navbar.module.scss';
import { useForm } from 'react-hook-form';
import { GlobalContext, GlobalContextProps } from '../layout';
import { useRouter } from 'next/router';
import { ArrowLeft, Bookmark, Home } from 'react-feather';
import { ButtonIcon } from '../../button/button-icon';

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
        <button type="button" className={style.btn_back} onClick={() => router.back()}>
          <span>
            <ArrowLeft size={24} />
          </span>
          <span className="label">Back</span>
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
        <span className={style.btn_nav_label}>Home</span>
      </ButtonIcon>

      <ButtonIcon icon={Bookmark} onClick={() => router.push('/bookmark')}>
        <span className={style.btn_nav_label}>Bookmark</span>
      </ButtonIcon>
    </nav>
  );
}

