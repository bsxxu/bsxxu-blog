'use client';

//TODO 使用react-hook-form
//做基础的输入item
export default function Form({ children }: { children: React.ReactNode }) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return <form onSubmit={handleSubmit}>{children}</form>;
}
