export type Service = {
  id: string;
  title: string;
  description: string;
  icon: string;
  startingPrice: string;
};

export type PricingPlan = {
  id: string;
  planName: string;
  price: string;
  features: string[];
  isPopular?: boolean;
};

export type DemoProject = {
  id: string;
  projectName: string;
  category: string;
  shortDescription: string;
  thumbnailUrl: string;
  demoUrl: string;
};

export type Testimonial = {
  id: string;
  customerName: string;
  businessName: string;
  review: string;
  rating: number;
  photoUrl: string;
};

export type Lead = {
  id?: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  createdAt?: any;
  status?: string;
};
