import PostUploadForm from '@/components/admin/post-upload-form';

export default function Page() {
  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto">
      <div className="mt-20 space-y-6 w-full">
        <div className="text-2xl font-bold">上传文章</div>
        <PostUploadForm />
      </div>
    </div>
  );
}
