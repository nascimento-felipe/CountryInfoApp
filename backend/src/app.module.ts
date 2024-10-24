import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CountriesController } from './countries/countries.controller';
import { CountriesModule } from './countries/countries.module';
import { CountriesService } from './countries/countries.service';

@Module({
  imports: [
    CountriesModule,
    HttpModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  controllers: [AppController, CountriesController],
  providers: [AppService, CountriesService],
})
export class AppModule {}
