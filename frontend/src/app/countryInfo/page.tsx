"use client";

import { api } from "@/axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale
);

interface DataChart {
  years: string[];
  values: number[];
}

interface BorderResponse {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;

  borders: BorderResponse[];
}

interface CountryInfo {
  flagUrl: string;
  borders: BorderResponse[];
  population: { years: string[]; values: number[] };
}

export default function CountryInfo() {
  const searchParams = useSearchParams();

  const countryName = searchParams.get("country");
  const countryCode = searchParams.get("code");

  const [countryInfo, setCountryInfo] = useState<CountryInfo>();

  useEffect(() => {
    console.log(countryName);
    console.log(countryCode);

    api
      .get(`country-info?country=${countryName}&code=${countryCode}`)
      .then((response) => {
        console.log(response.data);

        setCountryInfo(response.data);
      });
  }, []);

  const LineChart = () => {
    // Dados e configurações do gráfico
    const data = {
      labels: countryInfo?.population.years.splice(
        countryInfo?.population.years.length - 5
      ),
      datasets: [
        {
          label: "Population",
          data: countryInfo?.population.values.splice(
            countryInfo?.population.values.length - 5
          ),
          fill: false,
          borderColor: "rgba(100, 162, 212, 1)",
          backgroundColor: "rgba(255,255,255,1)",
          tension: 0.4,
        },
      ],
    };

    return (
      <Line
        data={data}
        options={{
          responsive: true,
          scales: {
            x: {
              ticks: {
                color: "white",
              },
            },
            y: {
              ticks: {
                color: "white",
              },
            },
          },
          plugins: {
            legend: {
              labels: {
                color: "white",
              },
              position: "top",
            },
            title: {
              color: "white",
              display: true,
              text: "Population",
            },
          },
        }}
      />
    );
  };

  return (
    <div className="flex h-screen items-center justify-evenly">
      <div className="flex flex-col">
        <h1 className="font-bold my-2">List of Borders</h1>
        {countryInfo?.borders.map((border) => {
          return (
            <span
              key={border.officialName}
              className="bg-slate-400 my-2 p-2 rounded-md"
            >
              {border.commonName}
            </span>
          );
        })}
      </div>

      <div>
        <h1 className="font-bold">Country's Flag</h1>
        <img src={countryInfo?.flagUrl} width={200} alt="Country's Flag" />
      </div>

      <div className="">
        <h1 className="font-bold">Population Data Chart</h1>
        <div className="w-96 h-96 text-white">{LineChart()}</div>
      </div>
    </div>
  );
}
