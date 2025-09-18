import {
  SiFacebook,
  SiGithub,
  SiInstagram,
  SiX,
} from "@icons-pack/react-simple-icons";

export function Footer() {
  return (
    <footer className="mt-20 flex w-full flex-col border-t bg-gray-200 px-4 py-10 text-sm">
      <p className="text-left text-4xl font-extrabold dark:text-black">
        SHOP.CO
      </p>
      <p className="mt-2 max-w-2xl text-lg text-gray-600 sm:text-2xl">
        We have clothes that suits your style and which you’re proud to wear.
        From women to men.
      </p>
      <div className="mt-6 flex gap-4 [&_svg]:size-7">
        <SiX className="dark:border-dark cursor-pointer rounded border border-white bg-white p-1 hover:text-black dark:bg-black" />
        <SiFacebook className="dark:border-dark cursor-pointer rounded border border-black bg-black p-1 text-white hover:text-gray-300 dark:border-white dark:bg-white dark:text-black" />
        <SiInstagram className="dark:border-dark cursor-pointer rounded border border-white bg-white p-1 hover:text-black dark:bg-black" />
        <SiGithub className="dark:border-dark cursor-pointer rounded border border-white bg-white p-1 hover:text-black dark:bg-black" />
      </div>
    </footer>
  );
}
