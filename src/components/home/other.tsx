import AnimateView from '../animate-view';

export default function Other() {
  return (
    <AnimateView
      as="div"
      className="w-full space-y-7 py-24 pt-36 px-32"
      motionProps={{
        initial: {
          y: 50,
          opacity: 0,
        },
        whileInView: {
          y: 0,
          opacity: 1,
        },
        transition: {
          duration: 0.5,
          delay: 0.5,
          ease: 'easeOut',
        },
        viewport: {
          once: true,
        },
      }}
    >
      <div className="text-center font-semibold text-2xl">想看点什么</div>
    </AnimateView>
  );
}
