

export enum RefundStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export interface CreateRefundRequestDto {
  paymentId: number;
  reason: string;
  status: RefundStatus;
  resolutionDate?: string;
}
