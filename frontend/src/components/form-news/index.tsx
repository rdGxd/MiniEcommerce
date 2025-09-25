"use client";

import { Button } from "../ui/button";

export function FormNews() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <div className="flex w-full max-w-5xl flex-col items-center justify-center p-4">
      <form
        className="flex w-full flex-col items-center justify-center gap-4 rounded-xl bg-black p-6 sm:flex-row"
        onSubmit={handleSubmit}
      >
        <h2 className="text-4xl font-bold text-white uppercase">
          Stay upto date about our latest offers
        </h2>
        <input
          type="email"
          placeholder="Enter your email address"
          className="w-full flex-1 rounded-xl border border-gray-300 bg-white p-3 text-black outline-none focus:border-black focus:ring-0 sm:w-auto dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-white"
        />
        <Button
          type="submit"
          className="w-full flex-1 rounded-xl border border-gray-300 bg-white p-3 text-black outline-none focus:border-black focus:ring-0 sm:w-auto dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-white"
        >
          Subscribe to Newsletter
        </Button>
      </form>
    </div>
  );
}
