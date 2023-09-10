export function classNames(...style: string[]): string {
  const joinedClass = style.join(' ');

  return joinedClass;
}
