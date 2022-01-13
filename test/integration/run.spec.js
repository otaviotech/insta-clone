import { afterAll } from '@jest/globals';
import { disconnectDatabase } from '../utils/db';

import '../../src/main/server/routes/auth/signin.spec';
import '../../src/main/server/routes/auth/signup.spec';
import '../../src/main/server/routes/profile/follow.spec';

afterAll(disconnectDatabase);
