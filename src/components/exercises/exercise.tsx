import type { ExercisePayload } from "@/lib/exercises";
import { MultipleChoice } from "./multiple-choice";
import { Matching } from "./matching";
import { Ordering } from "./ordering";

// Dispatcher: wählt anhand payload.type die passende Übungs-Komponente.
// onSolved wird durchgereicht, damit der Lektions-Wrapper den Abschluss erkennt.
export function Exercise({
  payload,
  seed,
  onSolved,
}: {
  payload: ExercisePayload;
  seed: string;
  onSolved?: () => void;
}) {
  switch (payload.type) {
    case "multiple-choice":
      return <MultipleChoice payload={payload} seed={seed} onSolved={onSolved} />;
    case "matching":
      return <Matching payload={payload} seed={seed} onSolved={onSolved} />;
    case "ordering":
      return <Ordering payload={payload} seed={seed} onSolved={onSolved} />;
    default:
      return null;
  }
}
