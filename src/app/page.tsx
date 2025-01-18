
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { carsData } from "../lib/data";
import { Car, CarCardProps } from "../lib/types";

const CarCard: React.FC<CarCardProps> = ({ car }) => (
  <Card className="w-full max-w-[304px] mx-auto h-auto flex flex-col justify-between">
    <CardHeader>
      <CardTitle className="w-full flex items-center justify-between">
        {car.name} <Image src={car.heartIcon} alt="" width={20} height={20} />
      </CardTitle>
      <CardDescription>{car.category}</CardDescription>
    </CardHeader>
    <CardContent className="w-full flex flex-col items-center justify-center gap-4">
      <Image src={car.image} alt="" width={220} height={68} />
      <Image src={car.specImage} alt="" width={256} height={24} />
    </CardContent>
    <CardFooter className="w-full flex items-center justify-between">
      <p>
        ${car.price.toFixed(2)}/<span className="text-gray-500">day</span>
      </p>
      <Link 
        href="/details"

        >
      <button className="bg-[#3563e9] p-2 text-white rounded-md">Rent Now</button>
      </Link>
    </CardFooter>
  </Card>
);

export default function Cars() {
  const popularCars = carsData.filter(car => car.isPopular);
  const recommendedCars = carsData.filter(car => car.isRecommended);

  return (
    <>
<div className="bg-[#f6f7f9] min-h-screen p-4 sm:p-6 lg:p-20 flex flex-col gap-10 font-[family-name:var(--font-geist-sans)]">

<section className="first w-full flex flex-wrap sm:flex-nowrap gap-4 sm:gap-8 justify-center">
  <Image src={"/Ads 1.png"} alt="" width={640} height={360} className="max-w-full" />
  <Image src={"/Ads 2.png"} alt="" width={640} height={360} className="max-w-full" />
</section>

<section className="w-full flex flex-wrap sm:flex-nowrap items-center justify-center sm:justify-between gap-4 sm:gap-8">
  <Image src={"/Pick - Up.png"} alt="" width={582} height={132} className="max-w-full" />
  <Image src={"/Switch.png"} alt="" width={70} height={70} className="max-w-full" />
  <Image src={"/Drop - Off.png"} alt="" width={582} height={132} className="max-w-full" />
</section>

<section className="popular w-full flex flex-col gap-4">
  <div className="first w-full flex items-center justify-between">
    <h1 className="text-gray-500 text-lg sm:text-xl">Popular Car</h1>
    <Link href="/categories">
      <h1 className="text-[#3563e9] font-bold hover:underline decoration-[#3563e9]">
        View All
      </h1>
    </Link>
  </div>
  <div className="sec overflow-x-auto flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
    {popularCars.map((car) => (
      <div
        key={car.id}
        className="min-w-[280px] sm:min-w-0 flex-shrink-0 sm:flex-shrink grid-item"
      >
        <CarCard car={car} />
      </div>
    ))}
  </div>
</section>

<section className="popular w-full flex flex-col gap-4">
  <h1 className="text-gray-500 text-lg sm:text-xl">Recommendation Car</h1>
  <div className="sec overflow-x-auto flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
    {recommendedCars.map((car, index) => (
      <div
        key={car.id}
        className="min-w-[280px] sm:min-w-0 flex-shrink-0 sm:flex-shrink grid-item"
      >
        <CarCard car={car} />
      </div>
    ))}
  </div>
</section>

<section className="button w-full text-center">
  <Link href="/categories">
    <button className="bg-[#3563e9] px-4 py-2 text-white rounded-md mt-5">
      Show More Cars
    </button>
  </Link>
</section>
</div>

    </>

  
  );
}