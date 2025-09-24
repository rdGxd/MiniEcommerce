import { getStarRating } from "@/helper/rating";
import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

interface Product {
  id: string;
  name: string;
  price: number;
  rating: number;
  description: string;
  image: string;
}

export const DetailsProducts = ({ product }: { product?: Product }) => {
  return (
    <div className="flex w-full flex-col items-center justify-center p-4 lg:gap-5">
      <div className="flex w-full max-w-3xl flex-col items-center justify-center gap-4 lg:flex-row lg:items-start">
        <div className="flex w-full max-w-sm justify-center rounded-2xl bg-gray-400 p-4 lg:max-w-none">
          <Image
            src={"https://picsum.photos/200/300"}
            alt={"Product Image"}
            width={200}
            height={200}
            className=""
          />
        </div>
        <div className="flex w-full max-w-3xl flex-col items-center justify-center p-4">
          <Carousel opts={{ align: "start" }} className="w-full max-w-sm">
            <CarouselContent>
              {Array.from({ length: 9 }).map((_, index) => (
                <CarouselItem key={index + 1} className="basis-1/3">
                  <div className="w-full rounded-lg bg-gray-300 p-2">
                    <Card>
                      <CardContent className="flex items-center justify-center p-0">
                        <Image
                          src={"https://picsum.photos/200/300"}
                          alt={"Product Image"}
                          width={500}
                          height={500}
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>

      <h1>
        {"Product Name"} {Math.random().toFixed(2)}
      </h1>
      {getStarRating(5)}
      <p>${(Math.random() * 100).toFixed(2)}</p>
      <p>{"Product Description"}</p>
    </div>
  );
};
