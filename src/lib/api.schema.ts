import { createSchema } from "@better-fetch/fetch";
import { z } from "zod/v4";

// Enum definitions
export const Category = z.enum([
  "DOG",
  "CAT",
  "BIRD",
  "FISH",
  "REPTILE",
  "RODENT",
  "OTHER",
]);

export const Status = z.enum(["AVAILABLE", "ADOPTED"]);

export const UserType = z.enum(["ADMIN", "FISICO", "JURIDICO"]);

export const User = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
});

export const CreateUpdateAnimal = z.object({
  name: z.string(),
  description: z.string(),
  category: Category,
  status: Status,
});

export const Animal = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  category: Category,
  status: Status,
});

export const ResponseDTO = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.record(z.string(), z.any()).nullable(),
});

export const AuthResponseData = z.object({
  name: z.string(),
  email: z.string(),
  token: z.string(),
  userType: UserType,
});

export const AuthResponse = z.object({
  success: z.boolean(),
  message: z.string(),
  data: AuthResponseData.nullable(),
});

export const UsersResponseData = z.object({
  users: z.array(User),
});

export const OngsResponseData = z.object({
  ongs: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      email: z.string(),
    }),
  ),
});

export const AnimalsResponseData = z.object({
  animals: z.array(Animal),
});

export const AnimalsPaginationData = z.object({
  animals: z.array(Animal),
  totalElements: z.number(),
  totalPages: z.number(),
  page: z.number(),
  size: z.number(),
});

export const AnimalsQuerySchema = z.object({
  category: Category.optional(),
  status: Status.optional(),
  page: z.number().optional(),
  size: z.number().optional(),
});

export const LoginRequest = z.object({
  email: z.email(),
  password: z.string(),
});

export const RegisterRequest = z.object({
  name: z.string(),
  email: z.email(),
  phone: z.string(),
  cpf: z.string().optional(),
  cnpj: z.string().optional(),
  userType: UserType,
  password: z.string(),
});

export const AdoptionResponse = z.object({
  animal: Animal,
  adopter: User,
  adoptionDate: z.string(), // LocalDateTime as ISO string
});

export const DonationResponse = z.object({
  id: z.string(),
  donor: User,
  amount: z.number(), // BigDecimal as number
  paymentMethod: z.string(),
  donationDate: z.string(), // LocalDateTime as ISO string
});

// API Schema
export const apiSchema = createSchema({
  // Auth Controller
  "@post/auth/register": {
    input: RegisterRequest,
    output: AuthResponse,
  },

  "@post/auth/login": {
    input: LoginRequest,
    output: AuthResponse,
  },

  // Animal Controller
  "/animal/animals": {
    query: AnimalsQuerySchema,
    output: z.object({
      success: z.boolean(),
      message: z.string(),
      data: AnimalsPaginationData.nullable(),
    }),
  },

  "/animal/:id": {
    params: z.object({
      id: z.string(),
    }),
    output: Animal,
  },

  "/animal/animalName/:name": {
    params: z.object({
      name: z.string(),
    }),
    output: z.array(Animal),
  },

  "/animal/animalStatus/:status": {
    params: z.object({
      status: Status,
    }),
    output: z.array(Animal),
  },

  "/animal/animalCategory/:category": {
    params: z.object({
      category: Category,
    }),
    output: z.array(Animal),
  },

  "@post/animal/createAnimal": {
    input: CreateUpdateAnimal,
    output: Animal,
  },

  "@put/animal/updateAnimal/:id": {
    params: z.object({
      id: z.string(),
    }),
    input: CreateUpdateAnimal,
    output: Animal,
  },

  "@delete/animal/deleteAnimal/:id": {
    params: z.object({
      id: z.string(),
    }),
    output: ResponseDTO,
  },

  "@put/animal/adopt/:id": {
    params: z.object({
      id: z.string(),
    }),
    output: AdoptionResponse,
  },

  // User Controller
  "/user/users": {
    output: z.object({
      success: z.boolean(),
      message: z.string(),
      data: UsersResponseData.nullable(),
    }),
  },

  "/user/ongs": {
    output: z.object({
      success: z.boolean(),
      message: z.string(),
      data: OngsResponseData.nullable(),
    }),
  },

  // Donation Controller
  "@post/donation/donate": {
    input: z.object({
      amount: z.number(),
      paymentMethod: z.string(),
    }),
    output: DonationResponse,
  },
});

export const AnimalsListResponse = z.object({
  success: z.boolean(),
  message: z.string(),
  data: AnimalsPaginationData.nullable(),
});
export type AnimalsListResponseType = z.infer<typeof AnimalsListResponse>;

export type AnimalType = z.infer<typeof Animal>;
export type CreateUpdateAnimalType = z.infer<typeof CreateUpdateAnimal>;
export type AnimalsResponseType = z.infer<typeof AnimalsResponseData>;
export type AnimalsQueryType = z.infer<typeof AnimalsQuerySchema>;

export type CategoryType = z.infer<typeof Category>;
export type StatusType = z.infer<typeof Status>;
export type UserTypeType = z.infer<typeof UserType>;
export type RegisterRequestType = z.infer<typeof RegisterRequest>;

export type ApiSchema = typeof apiSchema;
