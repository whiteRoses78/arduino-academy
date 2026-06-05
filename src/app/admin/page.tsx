import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUserRole } from "@/lib/auth/role";
import { canAdminister } from "@/lib/roles";
import { MakeTeacherForm } from "@/components/admin/make-teacher-form";
import { revokeTeacherForm } from "./actions";

export const metadata: Metadata = { title: "Admin" };

export default async function AdminPage() {
  if (!canAdminister(await getCurrentUserRole())) redirect("/");

  const supabase = await createClient();
  const { data: teachers } = await supabase.rpc("list_teachers");

  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Lehrer verwalten</h1>
      <p className="mt-2 text-muted-foreground">
        Schalte Accounts als Lehrer frei. Lehrer sehen die Lösungen in den
        Lektionen.
      </p>

      <section className="mt-8">
        <MakeTeacherForm />
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold tracking-tight">
          Aktuelle Lehrer &amp; Admins
        </h2>
        <ul className="mt-4 space-y-2">
          {(teachers ?? []).map((t) => (
            <li
              key={t.id}
              className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3 text-sm"
            >
              <span>
                {t.email}{" "}
                <span className="text-xs text-muted-foreground">({t.role})</span>
              </span>
              {t.role === "teacher" && (
                <form action={revokeTeacherForm}>
                  <input type="hidden" name="email" value={t.email} />
                  <button
                    type="submit"
                    className="text-xs text-destructive hover:underline"
                  >
                    zurückstufen
                  </button>
                </form>
              )}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
