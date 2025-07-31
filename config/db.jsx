// import { drizzle } from 'drizzle-orm/neon-http';

// export const db = drizzle(process.env.DATABASE_URL);

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
const pg = neon(process.env.DATABASE_URL);
export const db = drizzle({ client: pg });
