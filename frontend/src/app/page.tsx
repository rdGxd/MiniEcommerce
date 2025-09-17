export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1 className="text-4xl sm:text-6xl font-bold text-center">
        Welcome to <a href="https://nextjs.org">Next.js!</a>
      </h1>
      <p className="text-center text-lg sm:text-2xl max-w-2xl">
        This is a boilerplate for Next.js 15 with the new app directory, Tailwind CSS, and the Geist font.
      </p>
      <p className="text-center text-sm sm:text-base text-gray-500">
        Created by{" "}
        <a
          className="underline"
          href="https://github.com/nextjs/next.js/blob/canary/examples/with-tailwindcss/app/page.tsx"
        >
          this example
        </a>
      </p>
    </div>
  );
}
