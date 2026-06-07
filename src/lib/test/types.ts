// Typen für den Kompetenztest. Bewusst getrennt von der Übungs-Engine:
// die Frage, die der Browser sieht, enthält KEINE Lösung (correct/explanation).
// Die Auflösung kommt erst nach dem Abschicken vom Server zurück.

// Frage, wie der Browser sie bekommt — ohne richtige Antwort.
export type TestQuestion = {
  id: string;
  position: number;
  type: "multiple-choice";
  question: string;
  options: string[];
};

// Auflösung pro Frage (erst nach dem Abschicken).
export type TestQuestionResult = {
  id: string;
  selected: number | null;
  correct: number;
  is_correct: boolean;
  explanation: string | null;
};

export type TestResult = {
  score: number;
  max_score: number;
  percent: number;
  results: TestQuestionResult[];
};

// Antworten des Schülers: { [question_id]: gewählter Options-Index }.
export type TestAnswers = Record<string, number>;
