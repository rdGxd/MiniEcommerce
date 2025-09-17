import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-6 p-4 text-center">
        <h1 className="font-bold text-4xl">Find clothes that matches your style</h1>
        <p className="text-center text-lg sm:text-2xl max-w-2xl">
          Discover a wide range of clothing options tailored to your unique taste and preferences.
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
      </div>
    </>
  );
}
