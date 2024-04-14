import AnimateView from '../motion/animate-view';

export default function AboutMe() {
  return (
    <AnimateView
      as="div"
      className="h-1/5 w-full space-y-7 pt-36 px-32"
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
      }}
    >
      <div className="text-center font-semibold text-2xl">关于我</div>
      <p>
        我姓许，02年生于四川的某个乡镇，2021年就读于西北工业大学的软件工程专业。选择计算机很大一部分原因是据说好找工作，但我也确实从学习的过程中找到了很多乐趣，也让我认识了一些很优秀的人。
      </p>
      <p>
        我性格偏内向，喜欢一个人呆着做自己感兴趣的事。但也正在努力克服自己的不足，让自己出去社交。希望在未来成为一个现充程序员。
      </p>
      <p>
        我的技术栈主要是react相关，对后端也有所了解。希望在这个网站中留下一些我认为也许会有趣的东西。
      </p>
      <p>:D</p>
    </AnimateView>
  );
}
