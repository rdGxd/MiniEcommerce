import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { HashingProtocol } from './hashing-protocol';

@Injectable()
export class HashingService extends HashingProtocol {
  async hash(data: string): Promise<string> {
    const salt = await bcrypt.genSalt(12);
    return bcrypt.hash(data, salt);
  }

  async compare(data: string, hashed: string): Promise<boolean> {
    return await bcrypt.compare(data, hashed);
  }
}
