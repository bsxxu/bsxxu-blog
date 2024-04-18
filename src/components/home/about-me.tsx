import AnimateView from '../animate-view';

export default function AboutMe() {
  return (
    <AnimateView
      as="div"
      className="h-1/4 w-full space-y-7 pt-36 px-32"
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
      <div className="text-center font-semibold text-2xl">关于我</div>
      <p>
        我02年生于四川某乡镇，2021年就读于西北工业大学的软件工程专业。我从学习编程的过程中找到了很多乐趣，也认识了一些很优秀的人。
      </p>
      <p>
        我性格偏内向，喜欢一个人呆着做自己感兴趣的事，比如编程和画画。但也正在努力克服自己的不足，让自己出去社交。希望在未来成为一个现充程序员。
      </p>
      <p>
        我的技术栈主要是react相关，对后端也有所了解。这个网站中会有一些乱七八糟的东西，各位图一乐就好。
      </p>
      <p>:D</p>
    </AnimateView>
  );
}
