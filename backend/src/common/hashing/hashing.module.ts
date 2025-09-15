import { Module } from '@nestjs/common';
import { HashingProtocol } from './hashing-protocol';
import { HashingService } from './hashing.service';

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: HashingProtocol,
      useClass: HashingService,
    },
  ],
  exports: [HashingProtocol],
})
export class HashingModule {}
