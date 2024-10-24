import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { lastValueFrom, map, Observable } from 'rxjs';
import { CountryInfo } from './dtos/countryInfo.dto';

export interface FlagResponse {
  error: string;
  msg: string;
  data: {
    name: string;

    flag: string;

    iso2: string;

    iso3: string;
  }[];
}

export interface PopulationResponse {
  error: string;
  msg: string;
  data: {
    country: string;

    code: string;

    iso3: string;

    populationCounts: [{ year: string; value: number }];
  }[];
}

export interface BorderResponse {
  commomName: string;
  officialName: string;
  countryCode: string;
  region: string;

  borders: BorderResponse[];
}

@Injectable()
export class CountriesService {
  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {}
  private readonly FLAG_URL = this.configService.get<string>('FLAG_URL');
  private readonly BORDER_URL = this.configService.get<string>('BORDER_URL');
  private readonly POPULATION_URL =
    this.configService.get<string>('POPULATION_URL');
  private readonly AVAILABLE_COUNTRIES_URL = this.configService.get<string>(
    'AVAILABLE_COUNTRIES',
  );

  getCountriesAvailable(): Observable<AxiosResponse<CountriesService[]>> {
    return this.httpService
      .get(this.AVAILABLE_COUNTRIES_URL)
      .pipe(map((response) => response.data));
  }

  async getCountryInfo(countryName: string, code: string) {
    try {
      let country: CountryInfo;

      const flagUrl = await this.getFlag(countryName);
      const borders = await this.getBorders(code);
      const population = await this.getPopulation(countryName);

      return {
        flagUrl,
        borders,
        population,
      };
    } catch (error) {
      throw new Error(`Failed to fetch country: ${error.message}`);
    }
  }

  private async getFlag(countryName: string) {
    const flagData = await lastValueFrom(
      this.httpService
        .get<FlagResponse>(this.FLAG_URL)
        .pipe(map((response) => response.data.data)),
    );

    let flag: string;

    flagData.filter((country) => {
      if (country.name == countryName) {
        flag = country.flag;
      }
    });

    return flag;
  }

  private async getBorders(countryCode: string) {
    const borderData = await lastValueFrom(
      this.httpService
        .get<BorderResponse>(this.BORDER_URL + `/${countryCode}`)
        .pipe(map((response) => response.data)),
    );

    return borderData.borders;
  }

  private async getPopulation(countryName: string) {
    const countryInfo = await lastValueFrom(
      this.httpService
        .get<PopulationResponse>(this.POPULATION_URL)
        .pipe(map((response) => response.data.data)),
    );

    let populationData: { year: string; value: number }[];

    countryInfo.filter((country) => {
      if (country.country == countryName) {
        populationData = country.populationCounts;
      }
    });

    let values: number[] = [];
    let years: string[] = [];

    populationData.forEach((data) => {
      values.push(data.value);
      years.push(data.year);
    });

    return {
      years: years,
      values: values,
    };
  }
}
