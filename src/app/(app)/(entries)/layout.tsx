export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flow-root test">
      <main className="max-w-5xl mx-auto min-h-screen ">{children}</main>
    </div>
  );
}
