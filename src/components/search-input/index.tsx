import { InputHTMLAttributes, useContext } from 'react';
import { Search } from 'react-feather';
import style from './Input.module.scss';
import { UseFormRegister } from 'react-hook-form';
import { OptionProps, SelectComponent } from '../select';
import { GlobalContext, GlobalContextProps } from '../common/layout';

export type FormValuesProps = {
  [key: string]: string;
}

const selectOptions: OptionProps[] = [
  { value: 'intitle', label: 'Title' },
  { value: 'inauthor', label: 'Author' },
];

export function SearchInput(props: InputHTMLAttributes<HTMLInputElement> & { register?: UseFormRegister<FormValuesProps> }) {
  const { searchBy, setSearchBy } = useContext(GlobalContext) as GlobalContextProps;
  const { register, ...rest } = props;

  return (
    <div className={style.container}>
      <SelectComponent options={selectOptions} value={searchBy} onChange={setSearchBy}  />

      <input
        className={style.input} {...rest}
        {...(register && rest.name && register(rest.name))}
      />

      <button className="active:bg-none select-none">
        <Search className={style.icon} />
      </button>
    </div>
  );
}
