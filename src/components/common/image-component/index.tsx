import Image from 'next/image';

import style from './Images.module.scss';

export function ImageComponent(props: { src: string, alt: string }) {
  const { src, alt } = props;
  return (
    <Image src={src} objectFit="contain" fill className={style.image} alt={alt} loading="lazy" />
  );
}
