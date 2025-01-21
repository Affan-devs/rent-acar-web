import { Image } from "sanity"; 

export default interface CarServices {

        name: string;
        brand: string;
        type: string;
        fuelCapacity: string;
        transmission: string;
        seatingCapacity: string;
        pricePerDay: string;
        originalPrice: string;
        tags: string[];
        image: {
          asset: {
            _ref: string;
            _type: string;
          };
          hotspot?: {
            x: number;
            y: number;
            height: number;
            width: number;
          };
        };
      };
      

      