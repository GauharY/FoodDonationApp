"use client";

import { cn } from "@/lib/utils";
import {
  DONATION_STATUS_CONFIG,
  DELIVERY_STATUS_CONFIG,
  REQUEST_STATUS_CONFIG,
} from "@/lib/constants";
import type { DonationStatus, DeliveryStatus, RequestStatus } from "@/lib/types";

type StatusType = "donation" | "delivery" | "request";

interface StatusBadgeProps {
  status: DonationStatus | DeliveryStatus | RequestStatus;
  type: StatusType;
  className?: string;
}

export function StatusBadge({ status, type, className }: StatusBadgeProps) {
  const config =
    type === "donation"
      ? DONATION_STATUS_CONFIG[status as DonationStatus]
      : type === "delivery"
      ? DELIVERY_STATUS_CONFIG[status as DeliveryStatus]
      : REQUEST_STATUS_CONFIG[status as RequestStatus];

  if (!config) return null;

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        config.bgColor,
        config.color,
        className
      )}
    >
      {config.label}
    </span>
  );
}
