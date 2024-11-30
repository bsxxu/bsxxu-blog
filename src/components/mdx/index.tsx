import type { UseMdxComponents } from '@mdx-js/mdx';
import Heading from './heading';
import Img from './img';
import P from './p';
import Pre from './pre';

const mdxComponents: ReturnType<UseMdxComponents> = {
  //TODO other components
  h1: (props: any) => <Heading as="h1" {...props} />,
  h2: (props: any) => <Heading as="h2" {...props} />,
  h3: (props: any) => <Heading as="h3" {...props} />,
  h4: (props: any) => <Heading as="h4" {...props} />,
  h5: (props: any) => <Heading as="h5" {...props} />,
  h6: (props: any) => <Heading as="h6" {...props} />,
  pre: (props: any) => <Pre {...props} />,
  p: (props: any) => <P {...props} />,
  img: (props: any) => <Img {...props} />,
};

export default mdxComponents;
