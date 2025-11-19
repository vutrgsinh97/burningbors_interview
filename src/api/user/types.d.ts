type TUserHair = {
  color: string;
  type: string;
};

type TUserAddress = {
  address: string;
  city: string;
  state: string;
  stateCode: string;
  postalCode: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  country: string;
};

type TUserBank = {
  cardExpire: string;
  cardNumber: string;
  cardType: string;
  currency: string;
  iban: string;
};

type TUserCompany = {
  department: string;
  name: string;
  title: string;
  address: TUserAddress;
};

type TUserCryto = {
  coin: string;
  wallet: string;
  network: string;
};

type TUserDetail = {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: TUserHair;
  ip: string;
  address: TUserAddress;
  macAddress: string;
  university: string;
  bank: TUserBank;
  company: TUserCompany;
  ein: string;
  ssn: string;
  userAgent: string;
  crypto: TUserCryto;
  role: string;
};
