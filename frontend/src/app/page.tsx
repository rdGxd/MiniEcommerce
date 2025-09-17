import { NewArrivals } from "@/components/new-arrivals";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <>
      {/* Texto da HOME */}
      <div className="flex flex-col items-center justify-center gap-6 p-4 text-center">
        <h1 className="font-bold text-4xl">
          Find clothes that matches your style
        </h1>
        <p className="text-center text-lg sm:text-2xl max-w-2xl">
          Discover a wide range of clothing options tailored to your unique
          taste and preferences.
        </p>
        <Button size="lg" className="w-full cursor-pointer">
          Shop Now
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-2 w-full max-w-3xl">
        <div className="flex flex-col items-center justify-center">
          <p className="font-bold text-2xl">200+</p>
          <span>International Brands</span>
        </div>

        <div className="flex flex-col items-center justify-center">
          <p className="font-bold text-2xl">2000+</p>
          <span>High-Quality Products</span>
        </div>

        <div className="flex flex-col items-center justify-center col-span-2 sm:col-span-1">
          <p className="font-bold text-2xl">30,000+</p>
          <span>Happy Customers</span>
        </div>
        {/* Image do casal  */}
        <div className="flex items-center justify-center col-span-2 sm:col-span-1 mt-5">
          <Image
            src="/CasalDaHome.svg"
            alt="Clothes 1"
            width={500}
            height={500}
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>
      </div>
      {/* Logos das marcas  */}
      <div className="grid grid-cols-3 gap-5 col-span-2 sm:col-span-1 p-2 justify-items-center items-center dark:bg-gray-500 bg-black rounded-lg border border-gray-300  h-full">
        <Image src={"/versace.svg"} alt="Versace" width={116} height={23} />
        <Image src={"/zara-logo-1.svg"} alt="Zara" width={63} height={26} />
        <Image src={"/gucci-logo-1.svg"} alt="Gucci" width={109} height={25} />
        <Image src={"/prada-logo-1.svg"} alt="Prada" width={127} height={21} />
        <Image
          src={"/Calvin.svg"}
          alt="Calvin Klein"
          width={134}
          height={21}
          className=" col-span-2"
        />
      </div>
      <NewArrivals />
    </>
  );
}
