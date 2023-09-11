import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

export type OptionProps = {
  label: string;
  value: string;
}

export type SelectProps = {
  options: OptionProps[];
  value: string;
  onChange: (val: string) => void;
}

export function SelectComponent(props: SelectProps) {
  const { options, value, onChange } = props;
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="max-w-[6rem] border-none focus:outline-none focus:ring-0 focus:border-none focus:ring-offset-0">
        <SelectValue placeholder={value} />
      </SelectTrigger>

      <SelectContent>
        {options.map(option => (
          <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
