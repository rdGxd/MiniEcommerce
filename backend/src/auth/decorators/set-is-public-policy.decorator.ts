import { CustomDecorator, SetMetadata } from '@nestjs/common';

import { IS_PUBLIC_KEY } from '../../constants/public.constants';

export const Public = (): CustomDecorator<string> =>
  SetMetadata(IS_PUBLIC_KEY, true);
