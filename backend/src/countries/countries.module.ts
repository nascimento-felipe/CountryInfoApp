import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CountriesService } from './countries.service';

@Module({
  imports: [HttpModule],
  providers: [CountriesService],
})
export class CountriesModule {}
