import SearchSyncButton from '@/components/admin/search-sync-button';

export default function Page() {
  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto">
      <div className="mt-20 space-y-6 w-full">
        <div className="text-2xl font-bold">meilisearch</div>
        <SearchSyncButton />
      </div>
    </div>
  );
}
