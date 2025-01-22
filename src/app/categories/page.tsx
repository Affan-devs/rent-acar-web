<<<<<<< HEAD
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
import { carsData } from '@/lib/data';
import {  CarCardProps } from '@/lib/types';

const carTypes = ["Sport", "SUV", "MPV", "Sedan", "Coupe", "Hatchback"];
const carCapacities = [2, 4, 6, 8];

const CarCard: React.FC<CarCardProps> = ({ car }) => (
  <Card className="w-full max-w-[304px] mx-auto h-auto flex flex-col justify-between">
    <CardHeader>
      <CardTitle className="w-full flex items-center justify-between">
        {car.name} <Image src={car.heartIcon} alt="" width={20} height={20} />
      </CardTitle>
      <CardDescription>{car.category}</CardDescription>
    </CardHeader>
    <CardContent className="w-full flex md:flex-col items-center justify-center gap-4">
      <Image src={car.image} alt="" width={220} height={68} />
      <Image src={car.specImage} alt="" width={256} height={24} className='hidden md:flex' />
      <Image src="/Spesification (1).png" alt="" width={256} height={24} className='md:hidden' />
    </CardContent>
    <CardFooter className="w-full flex items-center justify-between">
      <p>
        ${car.price.toFixed(2)}/<span className="text-gray-500">day</span>
      </p>
      <Link href='/details'>
        <button className="bg-[#3563e9] p-2 text-white rounded-md">Rent Now</button>
      </Link>
    </CardFooter>
  </Card>
);

export default function Categories() {
  const [showMore, setShowMore] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedCapacities, setSelectedCapacities] = useState<number[]>([]);
  const [maxPrice, setMaxPrice] = useState(100);

  const toggleShowMore = () => setShowMore(!showMore);

  const filteredCars = carsData.filter((car) => {
    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(car.category);
    const matchesCapacity = selectedCapacities.length === 0; // We'll need to add capacity to the Car interface if needed
    const matchesPrice = car.price <= maxPrice;
    return matchesType && matchesCapacity && matchesPrice;
  });

  const displayedCars = showMore ? filteredCars : filteredCars.slice(0, 4);

  return (
    <div className="w-full flex">
      {/* Filter Bar */}
      <div className="first hidden sm:flex w-[360px] height-[1600px] bg-white p-4 flex-col gap-6">
        <div className="filter-type">
          <h4 className="font-semibold mb-2">Type</h4>
          {carTypes.map((type) => (
            <div key={type} className="flex items-center gap-2">
              <input
                type="checkbox"
                id={type}
                checked={selectedTypes.includes(type)}
                onChange={(e) => {
                  setSelectedTypes(e.target.checked 
                    ? [...selectedTypes, type]
                    : selectedTypes.filter(t => t !== type)
                  );
                }}
                className="text-blue-500 focus:ring-blue-400"
              />
              <label htmlFor={type} className="text-sm text-gray-700">{type}</label>
            </div>
          ))}
        </div>

        <div className="filter-capacity">
          <h4 className="font-semibold mb-2">Capacity</h4>
          {carCapacities.map((capacity) => (
            <div key={capacity} className="flex items-center gap-2">
              <input
                type="checkbox"
                id={`capacity-${capacity}`}
                checked={selectedCapacities.includes(capacity)}
                onChange={(e) => {
                  setSelectedCapacities(e.target.checked 
                    ? [...selectedCapacities, capacity]
                    : selectedCapacities.filter(c => c !== capacity)
                  );
                }}
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
            value={maxPrice}
            onChange={(e) => setMaxPrice(parseInt(e.target.value, 10))}
            className="w-full"
          />
          <p className="text-sm text-gray-700">Max: ${maxPrice}.00</p>
        </div>
      </div>

      {/* Cars Section */}
      <div className="sec w-full sm:w-[80%] bg-[#f6f7f9] p-4 sm:p-6 flex flex-col gap-10 font-[family-name:var(--font-geist-sans)]">
        <section className="w-full flex flex-col sm:flex-row items-center justify-center sm:justify-between">
          <Image src="/Pick - Up.png" alt="" width={582} height={132} className="w-[200px] md:w-[270px] lg:w-[582px]" />
          <Image src="/Switch.png" alt="" width={60} height={60} className="w-[80px]" />
          <Image src="/Drop - Off.png" alt="" width={582} height={132} className='w-[200px] md:w-[270px] lg:w-[582px]' />
        </section>

        <section className="popular w-full flex flex-col gap-4">
          <div className="sec grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {displayedCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        </section>

        <section className="button w-full text-center">
          <button 
            onClick={toggleShowMore} 
            className="bg-[#3563e9] px-4 py-2 text-white rounded-md mt-5"
=======
"use client";
import { useState, useEffect } from "react";
  import Image from "next/image";
  import Link from "next/link";
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { client } from "../lib/sanity";
  import { urlFor } from "../lib/sanity";
  import FilterComponent from "../components/FilterComponent";

  interface simplifiedCar {
    _id: string;
    name: string;
    type: string;
    slug: {
      current: string;
    };
    image: string;
    fuelCapacity: string;
    transmission: string;
    seatingCapacity: string;
    pricePerDay: string;
  }

  async function getData() {
    const query = `*[_type == "car"]{
    _id,
    name,
    type,
    slug,
    image{
      asset->{url}
    },
    fuelCapacity,
    transmission,
    seatingCapacity,
    pricePerDay,
  }`;
    const data = await client.fetch(query);
    return data;
  }

  export default function Page() {
    const [data, setData] = useState<simplifiedCar[]>([]);
    const [filteredData, setFilteredData] = useState<simplifiedCar[]>([]);
    const [filters, setFilters] = useState<any>({});
    const [showMore, setShowMore] = useState(false);
  
    const toggleShowMore = () => setShowMore(!showMore);

    useEffect(() => {
      async function fetchData() {
        const result = await getData();
        setData(result);
        setFilteredData(result);
      }

      fetchData();
    }, []);

    const handleFilterChange = (filters: any) => {
      setFilters(filters);
      applyFilters(filters);
    };

    const applyFilters = (filters: any) => {
      let filtered = [...data];

      if (filters.type && filters.type.length > 0) {
        filtered = filtered.filter((car) => filters.type.includes(car.type));
      }
      if (filters.seatingCapacity && filters.seatingCapacity.length > 0) {
        filtered = filtered.filter((car) =>
          filters.seatingCapacity.includes(car.seatingCapacity)
        );
      }
      if (filters.fuelCapacity && filters.fuelCapacity.length > 0) {
        filtered = filtered.filter((car) =>
          filters.fuelCapacity.includes(car.fuelCapacity)
        );
      }
      setFilteredData(filtered);
    };
  return (
    
    <div>

    {/* Banner Section */}
    <section className="w-full flex flex-col sm:flex-row items-center justify-center sm:justify-between mb-6 saturate-150">

      <Image src="/Pick - Up.png" alt="" width={582} height={132} className="w-[200px] md:w-[270px] lg:w-[582px]" />
      <Image src="/Switch.png" alt="" width={60} height={60} className="w-[80px]" />
      <Image src="/Drop - Off.png" alt="" width={582} height={132} className="w-[200px] md:w-[270px] lg:w-[582px]" />
    </section>

    {/* Main Section */}
    <div className="w-full flex">
      <div className="first hidden sm:flex w-[20%]">
        <FilterComponent onFilterChange={handleFilterChange} />
      </div>
      <div className="sec w-full sm:w-[80%] bg-[#f6f7f9] p-4 sm:p-6 flex flex-col gap-10 font-[family-name:var(--font-geist-sans)]">
        <section className="popular w-full flex flex-col gap-4">
          <div className="sec grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredData.map((product) => (
              <div key={product._id}>
                <Card className="w-full max-w-[304px] mx-auto h-[388px] flex flex-col justify-between">
                  <CardHeader>
                    <CardTitle className="w-full flex items-center justify-between">
                      {product.name}{" "}
                      <Image src={"/heart.png"} alt="" width={20} height={20} />
                    </CardTitle>
                    <CardDescription>{product.type}</CardDescription>
                  </CardHeader>
                  <CardContent className="w-full flex flex-col items-center justify-center gap-4 text-nowrap">
                    <Image
                      src={urlFor(product.image).url()}
                      alt=""
                      width={220}
                      height={68}
                    />
                    <div className="flex items-center justify-between mt-10">
                      <div className="flex items-center gap-2">
                        <Image
                          src={"/gas-station.png"}
                          alt=""
                          width={26}
                          height={24}
                        />
                        <h1>{product.fuelCapacity}</h1>
                      </div>
                      <div className="flex items-center gap-2">
                        <Image
                          src={"/Caricon.png"}
                          alt=""
                          width={26}
                          height={24}
                        />
                        <h1>{product.transmission}</h1>
                      </div>
                      <div className="flex items-center gap-2">
                        <Image
                          src={"/profile-2user.png"}
                          alt=""
                          width={26}
                          height={24}
                        />
                        <h1>{product.seatingCapacity}</h1>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="w-full flex items-center justify-between">
                    <p>
                      {product.pricePerDay}/
                      <span className="text-gray-500">day</span>
                    </p>
                    <Link href={`/categories/${product.slug.current}`}>
                      <button className="bg-[#3563e9] p-2 text-white rounded-md">
                        Rent Now
                      </button>
                    </Link>
                  </CardFooter>
                </Card>
              </div>
            ))}
              <section className="button w-full text-center ">
          <button 
            onClick={toggleShowMore} 
            className="bg-[#3563e9]  px-4 py-2 text-white rounded-md mt-5"
>>>>>>> 7867f03 (building component)
          >
            {showMore ? "Show Less Cars" : "Show More Cars"}
          </button>
        </section>
<<<<<<< HEAD
      </div>
    </div>
=======
          </div>
        </section>
      </div>
    </div>
  </div>
  
>>>>>>> 7867f03 (building component)
  );
}
