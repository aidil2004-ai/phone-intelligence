export interface CountryMeta {
  code: string;
  name: string;
  dial: string;
  lat: number;
  lng: number;
  region: string;
}

export const COUNTRY_DATA: Record<string, CountryMeta> = {
  ID: {
    code: "ID",
    name: "Indonesia",
    dial: "+62",
    lat: -2.5489,
    lng: 118.0149,
    region: "Asia Tenggara",
  },
  MY: {
    code: "MY",
    name: "Malaysia",
    dial: "+60",
    lat: 4.2105,
    lng: 101.9758,
    region: "Asia Tenggara",
  },
  SG: {
    code: "SG",
    name: "Singapura",
    dial: "+65",
    lat: 1.3521,
    lng: 103.8198,
    region: "Asia Tenggara",
  },
  US: {
    code: "US",
    name: "Amerika Serikat",
    dial: "+1",
    lat: 37.0902,
    lng: -95.7129,
    region: "Amerika Utara",
  },
  GB: {
    code: "GB",
    name: "Inggris",
    dial: "+44",
    lat: 55.3781,
    lng: -3.436,
    region: "Eropa Barat",
  },
  JP: {
    code: "JP",
    name: "Jepang",
    dial: "+81",
    lat: 36.2048,
    lng: 138.2529,
    region: "Asia Timur",
  },
  KR: {
    code: "KR",
    name: "Korea Selatan",
    dial: "+82",
    lat: 35.9078,
    lng: 127.7669,
    region: "Asia Timur",
  },
  AU: {
    code: "AU",
    name: "Australia",
    dial: "+61",
    lat: -25.2744,
    lng: 133.7751,
    region: "Oseania",
  },
  SA: {
    code: "SA",
    name: "Arab Saudi",
    dial: "+966",
    lat: 23.8859,
    lng: 45.0792,
    region: "Timur Tengah",
  },
  IN: {
    code: "IN",
    name: "India",
    dial: "+91",
    lat: 20.5937,
    lng: 78.9629,
    region: "Asia Selatan",
  },
  CN: {
    code: "CN",
    name: "Tiongkok",
    dial: "+86",
    lat: 35.8617,
    lng: 104.1954,
    region: "Asia Timur",
  },
  DE: {
    code: "DE",
    name: "Jerman",
    dial: "+49",
    lat: 51.1657,
    lng: 10.4515,
    region: "Eropa Tengah",
  },
  TH: {
    code: "TH",
    name: "Thailand",
    dial: "+66",
    lat: 15.87,
    lng: 100.9925,
    region: "Asia Tenggara",
  },
  PH: {
    code: "PH",
    name: "Filipina",
    dial: "+63",
    lat: 12.8797,
    lng: 121.774,
    region: "Asia Tenggara",
  },
};

export function getCountryMeta(isoCode?: string): CountryMeta {
  if (isoCode && COUNTRY_DATA[isoCode]) {
    return COUNTRY_DATA[isoCode];
  }
  return {
    code: isoCode || "UN",
    name: isoCode ? `Negara (${isoCode})` : "Wilayah Internasional",
    dial: "-",
    lat: 0,
    lng: 20,
    region: "Global",
  };
}
