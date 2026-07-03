// Paystack utilities
export interface PaystackReference {
  reference: string;
  trans: string;
  status: string;
  message: string;
  transaction: string;
  trxref: string;
}

export interface PaystackConfig {
  publicKey: string;
  email: string;
  amount: number; // in kobo (multiply by 100)
  reference: string;
  metadata?: Record<string, string | number | boolean>;
  onSuccess?: (reference: PaystackReference) => void;
  onClose?: () => void;
}

export const generatePaymentReference = (): string => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000000);
  return `LKJ-${timestamp}-${random}`;
};

export interface PaystackVerifyResponse {
  status: boolean;
  message: string;
  data: {
    reference: string;
    amount: number;
    status: string;
    [key: string]: unknown;
  };
}

export const verifyPayment = async (reference: string): Promise<PaystackVerifyResponse> => {
  try {
    const response = await fetch(`/api/paystack/verify?reference=${reference}`);
    if (!response.ok) {
      throw new Error('Payment verification failed');
    }
    return await response.json();
  } catch (error) {
    console.error('Payment verification error:', error);
    throw error;
  }
};

export const formatAmountToKobo = (amount: number): number => {
  return Math.round(amount * 100);
};

export const formatAmountFromKobo = (amount: number): number => {
  return amount / 100;
};
