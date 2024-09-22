import { AiOutlineLoading } from 'react-icons/ai';

export default function CommonLoading() {
  return (
    <div className="absolute-center flex flex-col items-center">
      <AiOutlineLoading className="animate-spin" />
      <div>loading...</div>
    </div>
  );
}
