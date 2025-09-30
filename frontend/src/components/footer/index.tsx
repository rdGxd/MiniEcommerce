import {
  SiApplepay,
  SiFacebook,
  SiGithub,
  SiGooglepay,
  SiInstagram,
  SiMastercard,
  SiPaypal,
  SiVisa,
  SiX,
} from "@icons-pack/react-simple-icons";
import { FormNews } from "../form-news";

export function Footer() {
  return (
    <footer className="mt-5 flex w-full flex-col border-t bg-gray-200 px-4 text-sm sm:px-8 md:px-16 lg:px-32 xl:px-48 2xl:px-64 dark:bg-gray-900">
      <FormNews />
      <p className="text-left text-4xl font-extrabold text-black">SHOP.CO</p>
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
      <div className="grid grid-cols-2 gap-4 text-black md:grid-cols-4">
        <div>
          <p className="mt-6 font-bold tracking-widest uppercase">Company</p>
          <ul className="mt-2 flex flex-col gap-2 text-gray-500">
            <li className="cursor-pointer hover:text-black dark:hover:text-white">
              About Us
            </li>
            <li className="cursor-pointer hover:text-black dark:hover:text-white">
              Features
            </li>
            <li className="cursor-pointer hover:text-black dark:hover:text-white">
              Works
            </li>
            <li className="cursor-pointer hover:text-black dark:hover:text-white">
              Career
            </li>
          </ul>
        </div>
        <div>
          <p className="mt-6 font-bold tracking-widest uppercase">Help</p>
          <ul className="mt-2 flex flex-col gap-2 text-gray-500">
            <li className="cursor-pointer hover:text-black dark:hover:text-white">
              Customer Support
            </li>
            <li className="cursor-pointer hover:text-black dark:hover:text-white">
              Delivery Details
            </li>
            <li className="cursor-pointer hover:text-black dark:hover:text-white">
              Term & Conditions
            </li>
            <li className="cursor-pointer hover:text-black dark:hover:text-white">
              Privacy Policy
            </li>
          </ul>
        </div>
        <div>
          <p className="mt-6 font-bold tracking-widest uppercase">Faq</p>
          <ul className="mt-2 flex flex-col gap-2 text-gray-500">
            <li className="cursor-pointer hover:text-black dark:hover:text-white">
              Account
            </li>
            <li className="cursor-pointer hover:text-black dark:hover:text-white">
              Manage Deliveries
            </li>
            <li className="cursor-pointer hover:text-black dark:hover:text-white">
              Orders
            </li>
            <li className="cursor-pointer hover:text-black dark:hover:text-white">
              Payment
            </li>
          </ul>
        </div>

        <div>
          <p className="mt-6 font-bold tracking-widest uppercase">Resources</p>
          <ul className="mt-2 flex flex-col gap-2 text-gray-500">
            <li className="cursor-pointer hover:text-black dark:hover:text-white">
              Free eBook
            </li>
            <li className="cursor-pointer hover:text-black dark:hover:text-white">
              Development Tutorial
            </li>
            <li className="cursor-pointer hover:text-black dark:hover:text-white">
              How to - Blog
            </li>
            <li className="cursor-pointer hover:text-black dark:hover:text-white">
              Youtube Playlist
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-6 flex w-full justify-center border-t border-gray-500 pt-2">
        <span className="text-gray-500">
          Shop.co © 2000-2023, All Rights Reserved
        </span>
      </div>
      <div className="mt-4 flex w-full justify-evenly [&_svg]:size-6">
        <div className="rounded-xl bg-white p-2 dark:bg-black">
          <SiMastercard className="text-red-500" />
        </div>
        <div className="rounded-xl bg-white p-2 dark:bg-black">
          <SiVisa className="text-blue-600" />
        </div>
        <div className="rounded-xl bg-white p-2 dark:bg-black">
          <SiPaypal className="text-blue-800" />
        </div>
        <div className="rounded-xl bg-white p-2 dark:bg-black">
          <SiApplepay className="text-black dark:text-white" />
        </div>
        <div className="rounded-xl border border-gray-300 bg-white p-2 dark:bg-black">
          <SiGooglepay className="text-black dark:text-white" />
        </div>
      </div>
    </footer>
  );
}
