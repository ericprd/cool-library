import style from './Card.module.scss';
import { classNames } from '@/src/utils/merger-classname';

export function CardLoader() {
  return (
    <div className={classNames(style.container, style.container_loader)}></div>
  );
}
