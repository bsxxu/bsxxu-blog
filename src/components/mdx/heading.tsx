import { RxLink2 } from 'react-icons/rx';

export default function Heading<
  T extends 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6',
>(
  props: React.ComponentPropsWithoutRef<T> & {
    as?: T;
  },
) {
  const { children, as, ...rest } = props;
  const H = as ?? 'h1';
  return (
    <H id={children?.toString()} {...rest} className="scroll-m-32 group">
      <a href={`#${children}`} className="flex items-center">
        <RxLink2 className="absolute -translate-x-5 transition-opacity opacity-0 group-hover:opacity-100" />
        {children}
      </a>
    </H>
  );
}
