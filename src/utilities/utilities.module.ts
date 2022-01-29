import { Module } from '@nestjs/common';
import { ResponseBuilderService } from './services/response-builder.service';

@Module({
  providers: [ResponseBuilderService],
  exports: [ResponseBuilderService],
})
export class UtilitiesModule {}
