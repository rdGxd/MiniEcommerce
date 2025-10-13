import { Module } from '@nestjs/common';

import { HashingService } from './hashing.service';
import { HashingProtocol } from './hashing-protocol';

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
