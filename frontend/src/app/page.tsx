import { DressStyle } from "@/components/dress-style";
import { TopSelling } from "@/components/new-arrivals";
import { NewArrivals } from "@/components/top-selling";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <>
      {/* Texto da HOME */}
      <div className="flex flex-col items-center justify-center gap-6 p-4 text-center">
        <h1 className="text-4xl font-bold">
          Find clothes that matches your style
        </h1>
        <p className="max-w-2xl text-center text-lg sm:text-2xl">
          Discover a wide range of clothing options tailored to your unique
          taste and preferences.
        </p>
        <Button size="lg" className="w-full cursor-pointer">
          Shop Now
        </Button>
      </div>

      <div className="grid w-full max-w-3xl grid-cols-2 gap-4 p-2 sm:grid-cols-3">
        <div className="flex flex-col items-center justify-center">
          <p className="text-2xl font-bold">200+</p>
          <span>International Brands</span>
        </div>

        <div className="flex flex-col items-center justify-center">
          <p className="text-2xl font-bold">2000+</p>
          <span>High-Quality Products</span>
        </div>

        <div className="col-span-2 flex flex-col items-center justify-center sm:col-span-1">
          <p className="text-2xl font-bold">30,000+</p>
          <span>Happy Customers</span>
        </div>
        {/* Image do casal  */}
        <div className="col-span-2 mt-5 flex items-center justify-center sm:col-span-1">
          <Image
            src="/CasalDaHome.svg"
            alt="Clothes 1"
            width={500}
            height={500}
            className="h-auto w-full rounded-lg object-cover"
          />
        </div>
      </div>
      {/* Logos das marcas  */}
      <div className="col-span-2 grid h-full grid-cols-3 items-center justify-items-center gap-5 rounded-lg border border-gray-300 bg-black p-2 sm:col-span-1 dark:bg-gray-500">
        <Image src={"/versace.svg"} alt="Versace" width={116} height={23} />
        <Image src={"/zara-logo-1.svg"} alt="Zara" width={63} height={26} />
        <Image src={"/gucci-logo-1.svg"} alt="Gucci" width={109} height={25} />
        <Image src={"/prada-logo-1.svg"} alt="Prada" width={127} height={21} />
        <Image
          src={"/Calvin.svg"}
          alt="Calvin Klein"
          width={134}
          height={21}
          className="col-span-2"
        />
      </div>
      <NewArrivals />
      <TopSelling />
      <DressStyle />
    </>
  );
}
