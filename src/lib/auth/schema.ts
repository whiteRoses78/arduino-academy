import { z } from "zod";

// Zugangsdaten fuer Anmeldung + Registrierung. Single Source of Truth:
// dasselbe Schema validiert im Browser (react-hook-form) UND im Server Action.
export const credentialsSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

export type Credentials = z.infer<typeof credentialsSchema>;
