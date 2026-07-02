// Paystack utilities
export interface PaystackConfig {
  publicKey: string;
  email: string;
  amount: number; // in kobo (multiply by 100)
  reference: string;
  metadata?: Record<string, any>;
  onSuccess?: (reference: any) => void;
  onClose?: () => void;
}

export const generatePaymentReference = (): string => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000000);
  return `LKJ-${timestamp}-${random}`;
};

export const verifyPayment = async (reference: string): Promise<any> => {
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
