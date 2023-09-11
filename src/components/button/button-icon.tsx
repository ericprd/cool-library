import { ReactNode } from 'react';
import { Icon } from 'react-feather';

export function ButtonIcon({ icon, onClick, children } : {icon: Icon; onClick: () => void; children?: ReactNode}) {
  const IconComp = icon;
  return (
    <button className="flex items-center gap-2" onClick={onClick}>
      <IconComp />
      {children}
    </button>
  );
}
