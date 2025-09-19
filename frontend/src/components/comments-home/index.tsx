import { getStarRating } from "@/helper/rating";
import { ArrowLeftIcon, ArrowRightIcon, CircleCheckIcon } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

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
      <div className="grid w-full max-w-5xl grid-cols-1 items-center justify-items-center p-4">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent>
            <CarouselItem className="md:basis-1/2 lg:basis-1/3">
              {getStarRating(5)}
              <p className="mt-4 flex gap-2 font-bold">
                Sarah M. <CircleCheckIcon className="text-green-500" />
              </p>
              <p className="max-w-2xl text-center text-lg text-gray-400 sm:text-2xl">
                "I recently purchased a dress from this online store, and I
                couldn't be happier with my experience. The website was easy to
                navigate, and I found the perfect dress for a special occasion.
                The quality of the fabric and craftsmanship exceeded my
                expectations. I received numerous compliments at the event, and
                I felt confident and beautiful wearing it. The customer service
                was exceptional as well, with prompt responses to my inquiries.
                I highly recommend this store to anyone looking for stylish and
                high-quality clothing."
              </p>
            </CarouselItem>
            <CarouselItem className="md:basis-1/2 lg:basis-1/3">
              {getStarRating(5)}
              <p className="mt-4 flex gap-2 font-bold">
                Sarah M. <CircleCheckIcon className="text-green-500" />
              </p>
              <p className="max-w-2xl text-center text-lg text-gray-400 sm:text-2xl">
                "I recently purchased a dress from this online store, and I
                couldn't be happier with my experience. The website was easy to
                navigate, and I found the perfect dress for a special occasion.
                The quality of the fabric and craftsmanship exceeded my
                expectations. I received numerous compliments at the event, and
                I felt confident and beautiful wearing it. The customer service
                was exceptional as well, with prompt responses to my inquiries.
                I highly recommend this store to anyone looking for stylish and
                high-quality clothing."
              </p>
            </CarouselItem>
            <CarouselItem className="md:basis-1/2 lg:basis-1/3">
              {getStarRating(5)}
              <p className="mt-4 flex gap-2 font-bold">
                Sarah M. <CircleCheckIcon className="text-green-500" />
              </p>
              <p className="max-w-2xl text-center text-lg text-gray-400 sm:text-2xl">
                "I recently purchased a dress from this online store, and I
                couldn't be happier with my experience. The website was easy to
                navigate, and I found the perfect dress for a special occasion.
                The quality of the fabric and craftsmanship exceeded my
                expectations. I received numerous compliments at the event, and
                I felt confident and beautiful wearing it. The customer service
                was exceptional as well, with prompt responses to my inquiries.
                I highly recommend this store to anyone looking for stylish and
                high-quality clothing."
              </p>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <div className="flex w-full items-center justify-center gap-2 p-4"></div>
    </>
  );
}
