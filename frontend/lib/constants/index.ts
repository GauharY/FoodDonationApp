import type {
  UserRole,
  DonationType,
  FoodType,
  FoodCategory,
  DonationStatus,
  DeliveryStatus,
  RequestStatus,
} from "@/lib/types";

export const USER_ROLES: { value: UserRole; label: string; description: string }[] = [
  { value: "DONOR", label: "Food Donor", description: "Restaurants, hotels, event organizers, or individuals" },
  { value: "NGO", label: "NGO / Charity", description: "Non-profit organizations serving communities" },
  { value: "DELIVERY_PARTNER", label: "Delivery Partner", description: "Help deliver food from donors to NGOs" },
];

export const DONATION_TYPES: { value: DonationType; label: string; description: string }[] = [
  { value: "FREE", label: "Donate Free", description: "Completely free donation" },
  { value: "DELIVERY_CHARGE", label: "Free + Delivery", description: "Free food, NGO pays delivery" },
  { value: "DISCOUNT", label: "Discounted", description: "Sell at reduced price" },
  { value: "EMERGENCY", label: "Emergency", description: "Urgent - expiring soon" },
];

export const FOOD_TYPES: { value: FoodType; label: string }[] = [
  { value: "VEG", label: "Vegetarian" },
  { value: "NON_VEG", label: "Non-Vegetarian" },
  { value: "VEGAN", label: "Vegan" },
];

export const FOOD_CATEGORIES: { value: FoodCategory; label: string }[] = [
  { value: "COOKED", label: "Cooked Food" },
  { value: "RAW", label: "Raw Ingredients" },
  { value: "PACKAGED", label: "Packaged Food" },
  { value: "BEVERAGES", label: "Beverages" },
  { value: "BAKERY", label: "Bakery Items" },
  { value: "DAIRY", label: "Dairy Products" },
  { value: "FRUITS_VEGETABLES", label: "Fruits & Vegetables" },
];

export const DONATION_STATUS_CONFIG: Record<
  DonationStatus,
  { label: string; color: string; bgColor: string }
> = {
  AVAILABLE: { label: "Available", color: "text-emerald-600", bgColor: "bg-emerald-500/10" },
  REQUESTED: { label: "Requested", color: "text-blue-600", bgColor: "bg-blue-500/10" },
  APPROVED: { label: "Approved", color: "text-indigo-600", bgColor: "bg-indigo-500/10" },
  PENDING_VERIFICATION: { label: "Pending Verification", color: "text-amber-600", bgColor: "bg-amber-500/10" },
  VERIFIED: { label: "Verified", color: "text-teal-600", bgColor: "bg-teal-500/10" },
  PICKED_UP: { label: "Picked Up", color: "text-purple-600", bgColor: "bg-purple-500/10" },
  ON_THE_WAY: { label: "On The Way", color: "text-orange-600", bgColor: "bg-orange-500/10" },
  DELIVERED: { label: "Delivered", color: "text-green-600", bgColor: "bg-green-500/10" },
  CANCELLED: { label: "Cancelled", color: "text-red-600", bgColor: "bg-red-500/10" },
  EXPIRED: { label: "Expired", color: "text-gray-600", bgColor: "bg-gray-500/10" },
};

export const DELIVERY_STATUS_CONFIG: Record<
  DeliveryStatus,
  { label: string; color: string; bgColor: string }
> = {
  ASSIGNED: { label: "Assigned", color: "text-blue-600", bgColor: "bg-blue-500/10" },
  PICKED_UP: { label: "Picked Up", color: "text-purple-600", bgColor: "bg-purple-500/10" },
  ON_THE_WAY: { label: "On The Way", color: "text-orange-600", bgColor: "bg-orange-500/10" },
  DELIVERED: { label: "Delivered", color: "text-green-600", bgColor: "bg-green-500/10" },
  CANCELLED: { label: "Cancelled", color: "text-red-600", bgColor: "bg-red-500/10" },
};

export const REQUEST_STATUS_CONFIG: Record<
  RequestStatus,
  { label: string; color: string; bgColor: string }
> = {
  PENDING: { label: "Pending", color: "text-amber-600", bgColor: "bg-amber-500/10" },
  APPROVED: { label: "Approved", color: "text-green-600", bgColor: "bg-green-500/10" },
  REJECTED: { label: "Rejected", color: "text-red-600", bgColor: "bg-red-500/10" },
  CANCELLED: { label: "Cancelled", color: "text-gray-600", bgColor: "bg-gray-500/10" },
};

export const UNITS = [
  "kg",
  "grams",
  "liters",
  "ml",
  "pieces",
  "servings",
  "boxes",
  "packets",
  "trays",
];

export const CITIES = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Chennai",
  "Kolkata",
  "Hyderabad",
  "Pune",
  "Ahmedabad",
  "Jaipur",
  "Lucknow",
];

export const NAV_ITEMS = {
  donor: [
    { href: "/donor", label: "Dashboard", icon: "LayoutDashboard" },
    { href: "/donor/donations", label: "My Donations", icon: "Package" },
    { href: "/donor/add-donation", label: "Add Donation", icon: "Plus" },
    { href: "/donor/history", label: "History", icon: "History" },
    { href: "/donor/analytics", label: "Analytics", icon: "BarChart3" },
  ],
  ngo: [
    { href: "/ngo", label: "Dashboard", icon: "LayoutDashboard" },
    { href: "/ngo/search", label: "Find Food", icon: "Search" },
    { href: "/ngo/requests", label: "My Requests", icon: "ClipboardList" },
    { href: "/ngo/track", label: "Track Delivery", icon: "MapPin" },
    { href: "/ngo/subscription", label: "Subscription", icon: "Crown" },
  ],
  delivery: [
    { href: "/delivery", label: "Dashboard", icon: "LayoutDashboard" },
    { href: "/delivery/tasks", label: "My Tasks", icon: "Truck" },
    { href: "/delivery/history", label: "History", icon: "History" },
  ],
  admin: [
    { href: "/admin", label: "Dashboard", icon: "LayoutDashboard" },
    { href: "/admin/users", label: "Users", icon: "Users" },
    { href: "/admin/donations", label: "Donations", icon: "Package" },
    { href: "/admin/reports", label: "Reports", icon: "FileText" },
    { href: "/admin/settings", label: "Settings", icon: "Settings" },
  ],
};
