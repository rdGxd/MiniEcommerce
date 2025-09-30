import { getStarRating } from "@/helper/rating";
import Image from "next/image";
import { Button } from "../ui/button";

export function TopSelling() {
  return (
    <div className="flex w-full flex-col items-center justify-center p-2 lg:gap-5">
      <h3 className="text-4xl font-semibold uppercase">Top Selling</h3>
      <div className="lg:scrollbar-hide grid w-full max-w-3xl grid-cols-2 gap-4 p-2 sm:grid-cols-3 md:grid-cols-4 lg:flex lg:max-w-5xl lg:grid-cols-5 lg:space-x-4 lg:overflow-x-auto lg:p-0 lg:pr-2 lg:pb-4">
        <div className="flex flex-col gap-2">
          <Image
            src={"https://picsum.photos/200/300?random=1"}
            alt="Top Selling"
            layout="responsive"
            width={200}
            height={200}
            className="bg-gray-400"
          />
          <span className="flex font-bold">T-shirt with Tape Details</span>
          <span className="text-sm">{getStarRating(5)}</span>
          <span className="text-lg font-bold">$120</span>
        </div>
        <div className="flex flex-col gap-2">
          <Image
            src={"https://picsum.photos/200/300?random=2"}
            alt="Top Selling"
            width={200}
            layout="responsive"
            height={200}
            className="bg-gray-400"
          />
          <span className="flex font-bold">T-shirt with Tape Details</span>
          <span className="text-sm">{getStarRating(5)}</span>
          <span className="text-lg font-bold">$120</span>
        </div>
        <div className="flex flex-col gap-2">
          <Image
            src={"https://picsum.photos/200/300?random=3"}
            alt="Top Selling"
            width={200}
            layout="responsive"
            height={200}
            className="bg-gray-400"
          />
          <span className="flex font-bold">T-shirt with Tape Details</span>
          <span className="text-sm">{getStarRating(5)}</span>
          <span className="text-lg font-bold">$120</span>
        </div>
        <div className="flex flex-col gap-2">
          <Image
            src={"https://picsum.photos/200/300?random=4"}
            alt="New Arrival"
            width={200}
            layout="responsive"
            height={200}
            className="bg-gray-400"
          />
          <span className="flex font-bold">T-shirt with Tape Details</span>
          <span className="text-sm">{getStarRating(5)}</span>
          <span className="text-lg font-bold">$240</span>
        </div>
      </div>
      <div className="flex w-full max-w-3xl flex-col gap-4 p-4 sm:flex-row md:justify-center">
        <Button
          size={"lg"}
          className="w-full cursor-pointer border border-black bg-white text-black transition-colors hover:bg-black hover:text-white md:w-56 dark:border-white dark:bg-black dark:text-white dark:hover:bg-white dark:hover:text-black"
        >
          View All
        </Button>
      </div>
      <span className="w-full border-1 border-t border-gray-300" />
    </div>
  );
}
