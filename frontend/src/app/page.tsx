"use client";

import { api } from "@/axios";
import Link from "next/link";
import { useEffect, useState } from "react";

interface CountryResponse {
  countryCode: string;
  name: string;
}

export default function Home() {
  const [selectedCountryName, setSelectedCountryName] = useState("Ukraine");
  const [countries, setCountries] = useState<CountryResponse[]>();
  const [selectedCountryCode, setSelectedCountryCode] = useState("UA");

  useEffect(() => {
    api.get("/available").then((response) => setCountries(response.data));
  }, []);

  return (
    <div className="flex flex-col h-screen w-screen justify-center items-center">
      <label htmlFor="" className="text-white font-bold text-xl">
        Choose Your Country
      </label>
      <select
        className="h-fit w-fit min-w-24 text-black p-2"
        name="Choose country"
        id="country"
        value={selectedCountryCode || ""}
        onChange={(e) => {
          setSelectedCountryCode(e.target.value);
          countries?.map((country) => {
            if (country.countryCode == e.target.value) {
              console.log("found");
              setSelectedCountryName(country.name);
            }
          });
        }}
      >
        {countries?.map((country) => {
          return (
            <option key={country.countryCode} value={country.countryCode}>
              {country.name}
            </option>
          );
        })}
      </select>

      <Link
        href={{
          pathname: "/countryInfo",
          query: { country: selectedCountryName, code: selectedCountryCode },
        }}
        className="bg-white p-2 m-2 text-black"
      >
        See information
      </Link>
    </div>
  );
}
