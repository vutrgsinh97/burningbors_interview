
type TCheckoutCart = {
  name: string;
  phone: string;
  email: string;
  postalCode: string;
  streetAddress: string;
  detailedAddress: string;
  deliveryNotes?: string | null;
  cardNumber: string;
  expiryDate: string;
  CVV: string;
  paymentMethod: string
};
