import { parsePhoneNumberFromString, CountryCode } from "libphonenumber-js";
import { getCountryMeta, CountryMeta } from "./countries";

export interface PhoneAnalysis {
  isValid: boolean;
  rawInput: string;
  e164: string;
  international: string;
  national: string;
  countryCode: string;
  callingCode: string;
  carrier: string;
  lineType: string;
  areaInfo: string;
  countryMeta: CountryMeta;
}

const ID_PREFIX_CARRIERS: Record<string, string> = {
  "811": "Telkomsel (Kartu Halo)",
  "812": "Telkomsel (Simpati)",
  "813": "Telkomsel (Simpati)",
  "821": "Telkomsel (Simpati)",
  "822": "Telkomsel (Loop)",
  "823": "Telkomsel (AS)",
  "851": "Telkomsel (by.U / AS)",
  "852": "Telkomsel (AS)",
  "853": "Telkomsel (AS)",
  "814": "Indosat Ooredoo Hutchison (M2)",
  "815": "Indosat Ooredoo Hutchison (Mentari)",
  "816": "Indosat Ooredoo Hutchison (Mentari)",
  "855": "Indosat Ooredoo Hutchison (Matrix)",
  "856": "Indosat Ooredoo Hutchison (IM3)",
  "857": "Indosat Ooredoo Hutchison (IM3)",
  "858": "Indosat Ooredoo Hutchison (Mentari)",
  "817": "XL Axiata",
  "818": "XL Axiata",
  "819": "XL Axiata",
  "859": "XL Axiata",
  "877": "XL Axiata",
  "878": "XL Axiata",
  "831": "AXIS (XL Axiata)",
  "832": "AXIS (XL Axiata)",
  "833": "AXIS (XL Axiata)",
  "838": "AXIS (XL Axiata)",
  "895": "Tri (3 / IOH)",
  "896": "Tri (3 / IOH)",
  "897": "Tri (3 / IOH)",
  "898": "Tri (3 / IOH)",
  "899": "Tri (3 / IOH)",
  "881": "Smartfren",
  "882": "Smartfren",
  "883": "Smartfren",
  "884": "Smartfren",
  "885": "Smartfren",
  "886": "Smartfren",
  "887": "Smartfren",
  "888": "Smartfren",
  "889": "Smartfren",
};

const ID_AREA_CODES: Record<string, string> = {
  "21": "Jabodetabek (DKI Jakarta, Bogor, Depok, Tangerang, Bekasi)",
  "22": "Bandung & Cimahi (Jawa Barat)",
  "24": "Semarang & Ungaran (Jawa Tengah)",
  "31": "Surabaya, Gresik, Sidoarjo, Bangkalan (Jawa Timur)",
  "331": "Jember (Jawa Timur)",
  "333": "Banyuwangi (Jawa Timur)",
  "338": "Situbondo (Jawa Timur)",
  "341": "Malang & Batu (Jawa Timur)",
  "361": "Denpasar & Badung (Bali)",
  "61": "Medan & Deli Serdang (Sumatera Utara)",
};

export function analyzePhoneNumber(
  input: string,
  defaultCountry: CountryCode = "ID",
): PhoneAnalysis | null {
  const cleaned = input.trim();
  if (!cleaned) return null;

  const parsed = parsePhoneNumberFromString(cleaned, defaultCountry);
  if (!parsed) return null;

  const country = parsed.country || defaultCountry;
  const nationalStr = parsed.nationalNumber.toString();
  let carrier = "Operator Internasional / Standar";
  let areaInfo = "Penomoran Nasional";
  let lineType = parsed.getType() || "MOBILE / FIXED";

  if (country === "ID") {
    const prefix3 = nationalStr.substring(0, 3);
    if (ID_PREFIX_CARRIERS[prefix3]) {
      carrier = ID_PREFIX_CARRIERS[prefix3];
      lineType = "Seluler (Mobile)";
      areaInfo = "Jaringan Seluler Nasional Indonesia";
    } else {
      const area2 = nationalStr.substring(0, 2);
      const area3 = nationalStr.substring(0, 3);
      if (ID_AREA_CODES[area3]) {
        areaInfo = ID_AREA_CODES[area3];
        carrier = "Telkom Indonesia (PSTN / Fixed Line)";
        lineType = "Telepon Kabel (Fixed Line)";
      } else if (ID_AREA_CODES[area2]) {
        areaInfo = ID_AREA_CODES[area2];
        carrier = "Telkom Indonesia (PSTN / Fixed Line)";
        lineType = "Telepon Kabel (Fixed Line)";
      }
    }
  }

  return {
    isValid: parsed.isValid(),
    rawInput: input,
    e164: parsed.number,
    international: parsed.formatInternational(),
    national: parsed.formatNational(),
    countryCode: country,
    callingCode: `+${parsed.countryCallingCode}`,
    carrier,
    lineType,
    areaInfo,
    countryMeta: getCountryMeta(country),
  };
}
