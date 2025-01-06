import z from "zod";

export const Creaet_user = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
