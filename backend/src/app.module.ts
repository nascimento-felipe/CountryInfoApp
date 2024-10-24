import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CountriesService } from './countries/countries.service';
import { CountriesController } from './countries/countries.controller';

@Module({
  imports: [],
  controllers: [AppController, CountriesController],
  providers: [AppService, CountriesService],
})
export class AppModule {}
