import Image from "next/image";

export function DressStyle() {
  return (
    <div className="ml-2 flex w-sm flex-col content-center items-center justify-center rounded-xl bg-gray-200 p-2 md:w-full">
      <h3 className="p-4 text-center text-4xl font-extrabold uppercase">
        Browse by dress style
      </h3>
      <div className="grid w-xs max-w-3xl grid-cols-1 gap-4 p-2 sm:grid-cols-3 md:w-full md:grid-cols-3 lg:min-w-full lg:grid-cols-5">
        <div className="flex content-center justify-around gap-2 rounded-md bg-white p-2 lg:col-span-2">
          <p className="text-2xl font-bold">Casual</p>
          <Image
            src={"https://picsum.photos/200/300"}
            alt="Dress Style"
            width={120}
            layout="responsive"
            height={120}
            className="rounded-md bg-gray-400"
          />
        </div>
        <div className="flex content-center justify-around gap-2 rounded-md bg-white p-2 md:col-span-2 lg:col-span-3">
          <p className="text-2xl font-bold">Formal</p>
          <Image
            src={"https://picsum.photos/200/300"}
            alt="Dress Style"
            width={120}
            layout="responsive"
            height={120}
            className="rounded-md bg-gray-400"
          />
        </div>

        <div className="flex content-center justify-around gap-2 rounded-md bg-white p-2 md:col-span-2 lg:col-span-3">
          <p className="text-2xl font-bold">Party</p>
          <Image
            src={"https://picsum.photos/200/300"}
            alt="Dress Style"
            width={120}
            height={120}
            layout="responsive"
            className="rounded-md bg-gray-400"
          />
        </div>

        <div className="flex content-center justify-around gap-2 rounded-md bg-white p-2 lg:col-span-2">
          <p className="text-2xl font-bold">Gym</p>
          <Image
            src={"https://picsum.photos/200/300"}
            alt="Dress Style"
            width={120}
            height={120}
            layout="responsive"
            className="rounded-md bg-gray-400"
          />
        </div>
      </div>
    </div>
  );
}
