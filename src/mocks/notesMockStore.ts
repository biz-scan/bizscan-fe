export type NoteTag = { id: string; name: string };
export type NoteStep = { id: string; task: string; isCompleted: boolean };

export type NoteDetail = {
  noteId: string;
  startDate: string;
  title: string;
  tags: NoteTag[];
  aiReason: string;
  steps: NoteStep[];
};

type Listener = () => void;

const INITIAL_NOTES: Record<string, NoteDetail> = {
  'NOTE-002': {
    noteId: 'NOTE-002',
    startDate: '2026.01.12',
    title: "오후 5시 '직장인 퇴근길' 예약 프로모션",
    tags: [
      { id: 't1', name: '사전기획' },
      { id: 't2', name: '메뉴아이디어' },
      { id: 't3', name: '아이템' },
    ],
    aiReason:
      '해당 업체는 가격 경쟁력이 우수합니다. 객단가가 주변보다 낮게 책정되어 있고...(AI 해석 텍스트)',
    steps: [
      { id: 's1', task: '가게 앞 입간판 문구 수정하기', isCompleted: true },
      { id: 's2', task: '퇴근길 예약 프로모션 문구 A/B 시안 만들기', isCompleted: true },
      { id: 's3', task: '픽업 동선/대기 구역 안내 문구 추가', isCompleted: false },
      { id: 's4', task: '예약 채널(네이버/카카오) 안내 배너 제작', isCompleted: false },
    ],
  },
  'NOTE-003': {
    noteId: 'NOTE-003',
    startDate: '2026.01.12',
    title: "오후 5시 '직장인 퇴근길' 예약 프로모션",
    tags: [
      { id: 't1', name: '사전기획' },
      { id: 't2', name: '메뉴아이디어' },
      { id: 't3', name: '아이템' },
    ],
    aiReason: '(AI 추천 이유 텍스트)',
    steps: [
      { id: 's1', task: '가게 앞 입간판 문구 수정하기', isCompleted: false },
      { id: 's2', task: '예약 동선 안내 문구 추가', isCompleted: false },
      { id: 's3', task: '배너 시안 제작', isCompleted: false },
    ],
  },
  'NOTE-010': {
    noteId: 'NOTE-010',
    startDate: '2026.01.01',
    title: '가게 첫 방문 고객 후기 이벤트',
    tags: [
      { id: 't4', name: '이벤트' },
      { id: 't5', name: '홍보' },
    ],
    aiReason: '(AI 추천 이유 텍스트)',
    steps: [
      { id: 's1', task: '이벤트 문구 확정', isCompleted: true },
      { id: 's2', task: '포스터 제작', isCompleted: true },
    ],
  },
};

function deepClone<T>(value: T): T {
  if (typeof structuredClone === 'function') return structuredClone(value);
  return JSON.parse(JSON.stringify(value)) as T;
}

function sameSteps(a: NoteStep[], b: NoteStep[]) {
  if (a === b) return true;
  if (a.length !== b.length) return false;

  for (let i = 0; i < a.length; i += 1) {
    const x = a[i];
    const y = b[i];
    if (x.id !== y.id) return false;
    if (x.task !== y.task) return false;
    if (x.isCompleted !== y.isCompleted) return false;
  }

  return true;
}

let notes: Record<string, NoteDetail> = deepClone(INITIAL_NOTES);

const listeners = new Set<Listener>();
let allNotesSnapshot: NoteDetail[] = Object.values(notes);

function refreshSnapshots() {
  allNotesSnapshot = Object.values(notes);
}

function emit() {
  listeners.forEach((l) => l());
}

export function subscribeNotes(listener: Listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getAllNotesSnapshot() {
  return allNotesSnapshot;
}

export function getNote(noteId: string) {
  return notes[noteId] ?? null;
}

export function updateNoteSteps(noteId: string, nextSteps: NoteStep[]) {
  const target = notes[noteId];
  if (!target) return;

  if (sameSteps(target.steps, nextSteps)) return;

  notes = {
    ...notes,
    [noteId]: { ...target, steps: nextSteps },
  };

  refreshSnapshots();
  emit();
}

export function calcProgress(steps: NoteStep[]) {
  const total = steps.length;
  const done = steps.reduce((acc, s) => (s.isCompleted ? acc + 1 : acc), 0);
  const percent = total > 0 ? Math.round((done / total) * 100) : 0;
  return { total, done, percent };
}

export function getNextGuideText(steps: NoteStep[]) {
  const firstTodo = steps.find((s) => !s.isCompleted);
  return firstTodo?.task ?? null;
}
