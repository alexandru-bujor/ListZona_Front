import apartmentImg from "@/assets/listing-apartment.jpg";
import carImg from "@/assets/listing-car.jpg";
import jobImg from "@/assets/listing-job.jpg";
import serviceImg from "@/assets/listing-service.jpg";
import sofaImg from "@/assets/listing-sofa.jpg";
import bikeImg from "@/assets/listing-bike.jpg";

export type Category = "jobs" | "housing" | "cars" | "services" | "community" | "for_sale";

export type Listing = {
  id: string;
  title: string;
  price: number | null;
  priceLabel?: string;
  location: string;
  category: Category;
  postedAt: string; // relative
  image: string;
  images?: string[];
  featured?: boolean;
  description: string;
  seller: {
    name: string;
    avatar: string;
    memberSince: string;
    verified: boolean;
    rating: number;
  };
};

const seller1 = {
  name: "Alex Morgan",
  avatar: "https://i.pravatar.cc/100?img=12",
  memberSince: "2022",
  verified: true,
  rating: 4.9,
};
const seller2 = {
  name: "Priya Patel",
  avatar: "https://i.pravatar.cc/100?img=47",
  memberSince: "2021",
  verified: true,
  rating: 4.8,
};
const seller3 = {
  name: "Marco Rossi",
  avatar: "https://i.pravatar.cc/100?img=33",
  memberSince: "2023",
  verified: false,
  rating: 4.6,
};

export const LISTINGS: Listing[] = [
  {
    id: "l1",
    title: "Sunny 2BR loft in downtown Brooklyn",
    price: 2850,
    priceLabel: "/mo",
    location: "Brooklyn, NY",
    category: "housing",
    postedAt: "2h ago",
    image: apartmentImg,
    images: [apartmentImg, sofaImg, jobImg],
    featured: true,
    description:
      "Bright south-facing loft with floor-to-ceiling windows, hardwood floors, in-unit laundry, and a private balcony. Steps from the F train. Available June 1.",
    seller: seller1,
  },
  {
    id: "l2",
    title: "2021 Tesla Model 3 — Long Range AWD",
    price: 28900,
    location: "Austin, TX",
    category: "cars",
    postedAt: "5h ago",
    image: carImg,
    images: [carImg],
    featured: true,
    description:
      "Single owner, garage kept, 32k miles. Premium interior, full self-driving, new tires. Clean title, all records available.",
    seller: seller2,
  },
  {
    id: "l3",
    title: "Senior Product Designer (Remote, US)",
    price: 145000,
    priceLabel: "/yr",
    location: "Remote · US",
    category: "jobs",
    postedAt: "1d ago",
    image: jobImg,
    featured: true,
    description:
      "Join a fast-growing fintech startup. We're looking for a senior designer with 5+ years of experience shipping consumer products at scale.",
    seller: seller3,
  },
  {
    id: "l4",
    title: "Licensed handyman — same-day service",
    price: 85,
    priceLabel: "/hr",
    location: "San Francisco, CA",
    category: "services",
    postedAt: "3h ago",
    image: serviceImg,
    featured: true,
    description:
      "10+ years experience. Plumbing, electrical, drywall, furniture assembly. Insured and bonded. Free estimates.",
    seller: seller1,
  },
  {
    id: "l5",
    title: "Vintage Chesterfield leather sofa",
    price: 1200,
    location: "Chicago, IL",
    category: "for_sale",
    postedAt: "6h ago",
    image: sofaImg,
    description: "Genuine leather, mint condition, recently reconditioned. Local pickup only.",
    seller: seller2,
  },
  {
    id: "l6",
    title: "Carbon road bike — 56cm Shimano 105",
    price: 1850,
    location: "Portland, OR",
    category: "for_sale",
    postedAt: "12h ago",
    image: bikeImg,
    description:
      "Lightweight carbon frame, 22 speeds, recently serviced. Includes pedals and bottle cages.",
    seller: seller3,
  },
  {
    id: "l7",
    title: "Cozy studio near University District",
    price: 1450,
    priceLabel: "/mo",
    location: "Seattle, WA",
    category: "housing",
    postedAt: "1d ago",
    image: apartmentImg,
    description: "Furnished studio, all utilities included, 5 min walk to campus.",
    seller: seller1,
  },
  {
    id: "l8",
    title: "Full-stack engineer at YC startup",
    price: 165000,
    priceLabel: "/yr",
    location: "New York, NY",
    category: "jobs",
    postedAt: "2d ago",
    image: jobImg,
    description: "TypeScript, React, Postgres. Equity + benefits. Hybrid 3 days/week.",
    seller: seller2,
  },
];

export const CATEGORIES: { id: Category; icon: string; gradient: string }[] = [
  { id: "jobs", icon: "Briefcase", gradient: "from-orange-500 to-red-500" },
  { id: "housing", icon: "Home", gradient: "from-blue-500 to-cyan-500" },
  { id: "cars", icon: "Truck", gradient: "from-purple-500 to-pink-500" },
  { id: "services", icon: "Wrench", gradient: "from-green-500 to-emerald-500" },
  { id: "community", icon: "Users", gradient: "from-yellow-500 to-amber-500" },
  { id: "for_sale", icon: "Tag", gradient: "from-rose-500 to-orange-500" },
];

export const TESTIMONIALS = [
  {
    name: "Sarah Chen",
    role: "Sold a sofa in 2 hours",
    avatar: "https://i.pravatar.cc/100?img=5",
    quote: "Cleanest marketplace I've ever used. Listed my couch in the morning, sold by lunch.",
  },
  {
    name: "James Williams",
    role: "Found a remote job",
    avatar: "https://i.pravatar.cc/100?img=68",
    quote: "Real listings, real people. The verified badges actually mean something here.",
  },
  {
    name: "Elena Rodríguez",
    role: "Rented out an apartment",
    avatar: "https://i.pravatar.cc/100?img=23",
    quote: "Premium feel without the premium price. My go-to for everything local.",
  },
];

export function getListing(id: string) {
  return LISTINGS.find((l) => l.id === id);
}
