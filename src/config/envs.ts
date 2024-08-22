import 'dotenv/config';
import * as joi from 'joi';

// Define a type that matches the environment variables schema
interface EnvVars {
  PORT: number;
  PRODUCTS_MICROSERVICE_HOST: string;
  PRODUCTS_MICROSERVICE_PORT: number;
  ORDERS_MICROSERVICE_HOST: string;
  ORDERS_MICROSERVICE_PORT: number;
}

// Create a schema that matches the EnvVars interface
const envSchema = joi.object<EnvVars>({
  PORT: joi.number().required(),
  PRODUCTS_MICROSERVICE_HOST: joi.string().required(),
  PRODUCTS_MICROSERVICE_PORT: joi.number().required(),
  ORDERS_MICROSERVICE_HOST: joi.string().required(),
  ORDERS_MICROSERVICE_PORT: joi.number().required(),
});

// Define a generic function to validate environment variables
function validateEnv<T>(
  schema: joi.ObjectSchema<T>,
  env: NodeJS.ProcessEnv,
): T {
  // Use Joi's validation with type assertion for better type inference
  const { error, value } = schema.validate(env, {
    allowUnknown: true,
    convert: true,
  });

  if (error) {
    throw new Error(`Config validation error: ${error.message}`);
  }

  return value;
}

// Convert the keys of EnvVars to lowercase
type LowercaseKeys<T> = {
  [K in keyof T as Lowercase<K & string>]: T[K];
};

// Validate the environment variables and infer the type
const validatedEnv = validateEnv(envSchema, process.env);

// Define the envs object with lowercase keys
export const envs: LowercaseKeys<EnvVars> = {
  port: validatedEnv.PORT,
  products_microservice_host: validatedEnv.PRODUCTS_MICROSERVICE_HOST,
  products_microservice_port: validatedEnv.PRODUCTS_MICROSERVICE_PORT,
  orders_microservice_host: validatedEnv.ORDERS_MICROSERVICE_HOST,
  orders_microservice_port: validatedEnv.ORDERS_MICROSERVICE_PORT,
};
