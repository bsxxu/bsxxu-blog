export default function CommonLoading() {
  return (
    <div className="absolute-center flex flex-col items-center">
      <span className="animate-spin i-ri-loader-5-fill" />
      <div>loading...</div>
    </div>
  );
}
