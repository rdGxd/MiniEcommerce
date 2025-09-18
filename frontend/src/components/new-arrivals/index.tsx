import Image from "next/image";
import { Button } from "../ui/button";

export function NewArrivals() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h3 className="text-4xl font-semibold uppercase">New Arrivals</h3>
      <div className="grid w-full max-w-3xl grid-cols-2 gap-4 p-2 sm:grid-cols-3">
        <div className="flex flex-col gap-2">
          <Image
            src={"https://picsum.photos/200/300"}
            alt="New Arrival"
            width={200}
            height={200}
            className="bg-gray-400"
          />
          <span className="flex font-bold">T-shirt with Tape Details</span>
          <span className="text-sm">5/10</span>
          <span className="text-lg font-bold">$120</span>
        </div>
        <div className="flex flex-col gap-2">
          <Image
            src={"https://picsum.photos/200/300"}
            alt="New Arrival"
            width={200}
            height={200}
            className="bg-gray-400"
          />
          <span className="flex font-bold">T-shirt with Tape Details</span>
          <span className="text-sm">5/10</span>
          <span className="text-lg font-bold">$240</span>
        </div>
      </div>
      <div className="flex w-full max-w-3xl flex-col gap-4 p-4 sm:flex-row">
        <Button
          size={"lg"}
          className="w-full cursor-pointer border border-black bg-white text-black transition-colors hover:bg-black hover:text-white dark:border-white dark:bg-black dark:text-white dark:hover:bg-white dark:hover:text-black"
        >
          View All
        </Button>
      </div>
      <span className="w-full border-1 border-t border-gray-300" />
    </div>
  );
}
