'use client';

import { useContext } from 'react';
import { FormValuesProps, SearchInput } from '../../search-input';
import style from './Navbar.module.scss';
import { useForm } from 'react-hook-form';
import { GlobalContext, GlobalContextProps } from '../layout';
import { useRouter } from 'next/router';

export function Navbar() {
  const { searchBy } = useContext(GlobalContext) as GlobalContextProps;
  const { register, handleSubmit } = useForm<FormValuesProps>();
  const router = useRouter();

  function submitHandler(data: FormValuesProps) {
    const { search_params } = data;
    const refinedString = search_params.split(' ').join('+');

    router.push(`/result/?search_by=${searchBy}&search=${refinedString}&index_items=0&page=1`);
  }

  return (
    <nav className={style.navbar_container}>
      <form className="w-full" onSubmit={handleSubmit(submitHandler)}>
        <SearchInput placeholder="Search..."
          register={register}
          name="search_params"
        />
      </form>
    </nav>
  );
}
