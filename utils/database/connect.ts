import pg, { PoolConfig } from "pg";

let credentials: PoolConfig;
// let adminCredentials: PoolConfig;
const dbUser = {
  user: "web3",
  password: process.env.USER_DATABASE_PASSWORD,
};

// const adminUser = {
//     user: "web3",
//     password: process.env.USER_DATABASE_PASSWORD,
// }

if (process.env.NODE_ENV === "development") {
  credentials = {
    host: "localhost",
    port: 5432,
    database: "machomarket",
    ...dbUser,
  };
} else {
  credentials = {
    ...dbUser,
    connectionString: process.env.RAILWAY_DATABASE_URL,
  };
}

// if (process.env.NODE_ENV === "development") {
//     adminCredentials = {
//       host: "localhost",
//       port: 5432,
//       database: "machomarket",
//       ...adminUser,
//     };
//   } else {
//     adminCredentials = {
//       ...adminUser,
//       connectionString: process.env.RAILWAY_DATABASE_URL,
//     };
//   }

const userPool = new pg.Pool(credentials);
// const adminPool = new pg.Pool(adminCredentials)

export const userQuery = async (query: string, params?: any[]) => {
  const connection = await userPool.connect();
  try {
    const res = await connection.query(query, params);
    return res;
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
};

export const adminQuery = async (query: string, params?: any[]) => {
  const connection = await userPool.connect();
  try {
    const res = await connection.query(query, params);
    return res;
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
};
