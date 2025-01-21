export interface Car {
    id: string;
    name: string;
    category: string;
    image: string;
    specImage: string;
    price: number;
    heartIcon: string;
    isPopular?: boolean;
    isRecommended?: boolean;
    title?: string;

  }
  export interface CarCardProps {
    car: Car;
  }

