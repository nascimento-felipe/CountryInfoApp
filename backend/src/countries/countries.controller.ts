import {
  Controller,
  Get,
  NotImplementedException,
  Query,
} from '@nestjs/common';

@Controller('countries')
export class CountriesController {
  @Get('available')
  getCountriesAvailable() {
    throw new NotImplementedException();
  }

  @Get('country-info')
  getCountryInfo(@Query('country') country: string) {
    throw new NotImplementedException();
  }
}
