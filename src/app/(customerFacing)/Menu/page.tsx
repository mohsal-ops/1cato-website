import type { Metadata } from 'next'
import { GetFeaturedProducts, GetGategories, GetPlaces, GetProducts } from './_actions/getDataNeeded'
import MainPageMenu from './_components/mainPage'
import { getBusinessHours } from '@/lib/getHours'

export const metadata: Metadata = {
  title: "Menu | Snow Cones & Exotic Flavors",
  description:
    "Order refreshing, gluten-free, fat-free snow cones online from 1Cato Snow Cones in Brooklyn, NY. Exotic natural flavors — pickup or catering for events.",
  keywords: [
    "snow cones Brooklyn menu",
    "gluten-free snow cones Brooklyn",
    "fat-free snow cones",
    "snow cones order online Brooklyn",
    "exotic snow cone flavors",
    "event snow cones Brooklyn",
  ],
  alternates: {
    canonical: "/Menu",
  },
  openGraph: {
    title: "Menu | 1Cato Snow Cones Brooklyn",
    description:
      "Refreshing snow cones with exotic natural flavors — order online for pickup or book catering in Brooklyn, NY.",
    url: "/Menu",
  },
}

export default async function Menu() {


   const [featuredProducts , places, categories, products, hours] = await Promise.all([
    GetFeaturedProducts(),
    GetPlaces(),
    GetGategories(),
    GetProducts(),
    getBusinessHours(),
   ])
  return (
      <MainPageMenu featuredProducts={featuredProducts}  places={places} products={products} gategories={categories} hours={hours} />
  )
}


