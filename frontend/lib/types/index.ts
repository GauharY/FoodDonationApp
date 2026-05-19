// User and Auth Types
export type UserRole = "ADMIN" | "DONOR" | "NGO" | "DELIVERY_PARTNER";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  isVerified: boolean;
  isApproved: boolean;
  profileImage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  phone?: string;
  address?: string;
  city?: string;
}

// Donation Types
export type DonationType = "FREE" | "DELIVERY_CHARGE" | "DISCOUNT" | "EMERGENCY";
export type FoodType = "VEG" | "NON_VEG" | "VEGAN";
export type FoodCategory = "COOKED" | "RAW" | "PACKAGED" | "BEVERAGES" | "BAKERY" | "DAIRY" | "FRUITS_VEGETABLES";

export type DonationStatus =
  | "AVAILABLE"
  | "REQUESTED"
  | "APPROVED"
  | "PENDING_VERIFICATION"
  | "VERIFIED"
  | "PICKED_UP"
  | "ON_THE_WAY"
  | "DELIVERED"
  | "CANCELLED"
  | "EXPIRED";

export interface Donation {
  id: string;
  donorId: string;
  donorName: string;
  donorPhone: string;
  title: string;
  description: string;
  foodType: FoodType;
  foodCategory: FoodCategory;
  donationType: DonationType;
  quantity: number;
  unit: string;
  servings?: number;
  expiryTime: string;
  preparedAt?: string;
  images: string[];
  pickupAddress: string;
  pickupCity: string;
  pickupPincode: string;
  pickupInstructions?: string;
  deliveryCharge?: number;
  discountPrice?: number;
  originalPrice?: number;
  status: DonationStatus;
  createdAt: string;
  updatedAt: string;
}

// Request Types
export type RequestStatus = "PENDING" | "APPROVED" | "REJECTED" | "CANCELLED";
export type PickupType = "SELF_PICKUP" | "DELIVERY_REQUIRED";

export interface FoodRequest {
  id: string;
  donationId: string;
  donation?: Donation;
  ngoId: string;
  ngoName: string;
  ngoPhone: string;
  pickupType: PickupType;
  requestedQuantity: number;
  message?: string;
  status: RequestStatus;
  deliveryId?: string;
  delivery?: Delivery;
  createdAt: string;
  updatedAt: string;
}

// Delivery Types
export type DeliveryStatus = "ASSIGNED" | "PICKED_UP" | "ON_THE_WAY" | "DELIVERED" | "CANCELLED";

export interface VerificationChecklist {
  foodFresh: boolean;
  quantityMatches: boolean;
  imageMatches: boolean;
  safePackaging: boolean;
  verificationImage?: string;
  notes?: string;
}

export interface Delivery {
  id: string;
  requestId: string;
  request?: FoodRequest;
  deliveryPartnerId: string;
  deliveryPartnerName: string;
  deliveryPartnerPhone: string;
  pickupAddress: string;
  deliveryAddress: string;
  pickupTime?: string;
  deliveryTime?: string;
  status: DeliveryStatus;
  verification?: VerificationChecklist;
  distance?: number;
  estimatedTime?: number;
  createdAt: string;
  updatedAt: string;
}

// Notification Types
export type NotificationType = "INFO" | "SUCCESS" | "WARNING" | "ERROR";

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  link?: string;
  createdAt: string;
}

// Analytics Types
export interface DonorStats {
  totalDonations: number;
  activeDonations: number;
  completedDonations: number;
  totalQuantityDonated: number;
  impactScore: number;
  mealsProvided: number;
}

export interface NgoStats {
  totalRequests: number;
  pendingRequests: number;
  completedRequests: number;
  totalFoodReceived: number;
  beneficiariesServed: number;
}

export interface DeliveryStats {
  totalDeliveries: number;
  activeDeliveries: number;
  completedDeliveries: number;
  averageRating: number;
  distanceCovered: number;
}

export interface AdminStats {
  totalUsers: number;
  totalDonors: number;
  totalNgos: number;
  totalDeliveryPartners: number;
  pendingApprovals: number;
  totalDonations: number;
  activeDonations: number;
  completedDeliveries: number;
  foodSaved: number;
  mealsProvided: number;
}

// Filter Types
export interface DonationFilters {
  foodType?: FoodType;
  foodCategory?: FoodCategory;
  donationType?: DonationType;
  status?: DonationStatus;
  city?: string;
  search?: string;
}

export interface UserFilters {
  role?: UserRole;
  isVerified?: boolean;
  isApproved?: boolean;
  search?: string;
}

// Pagination
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Subscription Types
export type SubscriptionPlan = "FREE" | "PREMIUM";

export interface Subscription {
  id: string;
  ngoId: string;
  plan: SubscriptionPlan;
  startDate: string;
  endDate: string;
  isActive: boolean;
  features: string[];
}
