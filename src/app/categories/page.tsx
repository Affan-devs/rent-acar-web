'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Page() {
  const [showMore, setShowMore] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedCapacities,] = useState([]);
  const [price, setPrice] = useState(100);

  const cars = [
    { title: 'Koenigsegg', image: '/car.png', desc: 'Sport', type: 'Sport', capacity: 2, price: 150 },
    { title: 'Nissan GT - R', image: '/car (1).png', desc: 'Luxury', type: 'Luxury', capacity: 4, price: 180 },
    { title: 'Rolls-Royce', image: '/suv.png', desc: 'Sport', type: 'Sport', capacity: 6, price: 220 },
    { title: 'All New Rush', image: '/suv (4).png', desc: 'Luxury', type: 'Luxury', capacity: 8, price: 200 },
    { title: 'CR - V', image: '/suv (4).png', desc: 'Luxury', type: 'Luxury', capacity: 4, price: 160 },
    { title: 'ALLNEW TERIOS', image: '/suv.png', desc: 'SUV', type: 'SUV', capacity: 6, price: 140 },
    { title: 'MGZX Exclusive', image: '/suv (4).png', desc: 'Luxury', type: 'Luxury', capacity: 8, price: 190 },
    { title: 'NEW MGZS', image: '/suv.png', desc: 'SUV', type: 'SUV', capacity: 4, price: 120 },
  ];

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };


  const filteredCars = cars.filter((car) => {

      const matchesType = selectedTypes.length === 0 || selectedTypes.some((type) => type === car.type);
      const matchesCapacity = selectedCapacities.length === 0 || selectedCapacities.some((capacity) => capacity === car.capacity);

    const matchesPrice = car.price <= price; // Price filter
    return matchesType && matchesCapacity && matchesPrice;
  });

  // Limiting the number of cars displayed when "Show More" is false
  const displayedCars = showMore ? filteredCars : filteredCars.slice(0, 4); // Show only 4 cars initially

  return (
    <div className="w-full flex">
      {/* Filter Bar */}
      <div className="first hidden sm:flex w-[360px] height-[1600px] bg-white p-4 flex-col gap-6">
        <div className="filter-type">
          <h4 className="font-semibold mb-2">Type</h4>
          {["Sport", "SUV", "MPV", "Sedan", "Coupe", "Hatchback"].map((type) => (
            <div key={type} className="flex items-center gap-2">
              <input
                type="checkbox"
                id={type}
                
                className="text-blue-500 focus:ring-blue-400"
              />
              <label htmlFor={type} className="text-sm text-gray-700">{type}</label>
            </div>
          ))}
        </div>

        <div className="filter-capacity">
          <h4 className="font-semibold mb-2">Capacity</h4>
          {[2, 4, 6, 8].map((capacity) => (
            <div key={capacity} className="flex items-center gap-2">
              <input
                type="checkbox"
                id={`capacity-${capacity}`}
              
                className="text-blue-500 focus:ring-blue-400"
              />
              <label htmlFor={`capacity-${capacity}`} className="text-sm text-gray-700">
                {capacity} Person
              </label>
            </div>
          ))}
        </div>

        <div className="filter-price">
          <h4 className="font-semibold mb-2">Price</h4>
          <input
            type="range"
            min="0"
            max="250"
            value={price}

            onChange={(e) => setPrice(parseInt(e.target.value, 10))}

            className="w-full"
          />
          <p className="text-sm text-gray-700">Max: ${price}.00</p>
        </div>
      </div>

      {/* Cars Section */}
      <div className="sec w-full sm:w-[80%] bg-[#f6f7f9] p-4 sm:p-6 flex flex-col gap-10 font-[family-name:var(--font-geist-sans)]">
        <section className="w-full flex flex-col sm:flex-row items-center justify-center sm:justify-between">
          <Image src={"/Pick - Up.png"} alt="" width={582} height={132} className="w-[200px] md:w-[270px] lg:w-[582px]" />
          <Image src={"/Switch.png"} alt="" width={60} height={60} className="w-[80px]" />
          <Image src={"/Drop - Off.png"} alt="" width={582} height={132} className='w-[200px] md:w-[270px] lg:w-[582px]' />
        </section>

        <section className="popular w-full flex flex-col gap-4">
          <div className="sec grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {displayedCars.map((car, index) => (
              <Card key={index} className="w-full max-w-[304px] mx-auto h-auto flex flex-col justify-between">
                <CardHeader>
                  <CardTitle className="w-full flex items-center justify-between">
                    {car.title} <Image src={"/heart.png"} alt="" width={20} height={20} />
                  </CardTitle>
                  <CardDescription>{car.desc}</CardDescription>
                </CardHeader>
                <CardContent className="w-full flex md:flex-col items-center justify-center gap-4">
                  <Image src={car.image} alt="" width={220} height={68} />
                  <Image src={"/Spesification.png"} alt="" width={256} height={24} className='hidden md:flex' />
                  <Image src={"/Spesification (1).png"} alt="" width={256} height={24} className='md:hidden' />
                </CardContent>
                <CardFooter className="w-full flex items-center justify-between">
                  <p>
                    ${car.price}.00/<span className="text-gray-500">day</span>
                  </p>
                  <Link href={'/details'}>
                    <button className="bg-[#3563e9] p-2 text-white rounded-md">Rent Now</button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        <section className="button w-full text-center">
          <button 
            onClick={toggleShowMore} 
            className="bg-[#3563e9] px-4 py-2 text-white rounded-md mt-5"
          >
            {showMore ? "Show Less Cars" : "Show More Cars"}
          </button>
        </section>
      </div>
    </div>
  );
}
