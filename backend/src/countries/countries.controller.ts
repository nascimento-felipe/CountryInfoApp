import { Controller, Get, Query } from '@nestjs/common';
import { CountriesService } from './countries.service';

@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get('available')
  getCountriesAvailable() {
    return this.countriesService.getCountriesAvailable();
  }

  @Get('country-info')
  getCountryInfo(
    @Query('country') country: string,
    @Query('code') code: string,
  ) {
    return this.countriesService.getCountryInfo(country, code);
  }
}
