import { HashingProtocol } from '@/common/hashing/hashing-protocol';
import { HashingService } from '@/common/hashing/hashing.service';
import { Module } from '@nestjs/common';

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
