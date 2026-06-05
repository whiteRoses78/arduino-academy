"use client";

import { useState, useTransition } from "react";
import { makeTeacher } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function MakeTeacherForm() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [isPending, startTransition] = useTransition();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    startTransition(async () => {
      const r = await makeTeacher(email);
      if (r.ok) {
        setMsg({ ok: true, text: `${email} ist jetzt Lehrer.` });
        setEmail("");
      } else {
        setMsg({ ok: false, text: r.error });
      }
    });
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3">
      <div className="grid gap-2">
        <Label htmlFor="teacher-email">E-Mail des Lehrers</Label>
        <Input
          id="teacher-email"
          type="email"
          placeholder="lehrer@beispiel.de"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <Button type="submit" disabled={isPending || !email}>
        {isPending ? "Wird freigeschaltet …" : "Zum Lehrer machen"}
      </Button>
      {msg && (
        <p
          role="status"
          className={msg.ok ? "text-sm text-primary" : "text-sm text-destructive"}
        >
          {msg.text}
        </p>
      )}
    </form>
  );
}
