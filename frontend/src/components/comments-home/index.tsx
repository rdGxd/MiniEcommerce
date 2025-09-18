import { getStarRating } from "@/helper/rating";
import { ArrowLeftIcon, ArrowRightIcon, CircleCheckIcon } from "lucide-react";

export function CommentsHome() {
  return (
    <>
      <div className="flex-col-2 flex w-full justify-around p-2">
        <div className="flex w-full p-4">
          <h3 className="flex text-4xl font-extrabold uppercase">
            Our Happy Customers
          </h3>
        </div>
        <div className="flex items-end justify-end gap-4">
          <ArrowLeftIcon />
          <ArrowRightIcon />
        </div>
      </div>
      <div className="m-2 flex flex-col rounded-2xl border border-gray-300 p-4">
        {getStarRating({ value: 5 })}
        <p className="mt-4 flex gap-2 font-bold">
          Sarah M. <CircleCheckIcon className="text-green-500" />
        </p>

        <p className="max-w-2xl text-center text-lg text-gray-400 sm:text-2xl">
          "I recently purchased a dress from this online store, and I couldn't
          be happier with my experience. The website was easy to navigate, and I
          found the perfect dress for a special occasion. The quality of the
          fabric and craftsmanship exceeded my expectations. I received numerous
          compliments at the event, and I felt confident and beautiful wearing
          it. The customer service was exceptional as well, with prompt
          responses to my inquiries. I highly recommend this store to anyone
          looking for stylish and high-quality clothing."
        </p>
      </div>
      <div className="flex w-full items-center justify-center gap-2 p-4">
        <span className="h-2 w-2 rounded-full bg-black"></span>
        <span className="h-2 w-2 rounded-full bg-gray-300"></span>
      </div>
    </>
  );
}
