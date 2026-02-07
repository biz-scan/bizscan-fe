export type NoteTag = { id: string; name: string };

export type NoteStep = {
  id: string;
  step: number;
  title: string;
  description: string;
  expectedOutcome: string;
  isCompleted: boolean;
};

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
      {
        id: 's1',
        step: 1,
        title: '가게 앞 입간판 문구 수정하기',
        description:
          "가게 앞 입간판 문구를 ‘퇴근길 예약 고객 전용 혜택’이 한 눈에 보이도록 수정합니다.",
        expectedOutcome:
          '지나가는 고객이 즉시 혜택을 인지하여 유입/예약 전환율이 올라갑니다.',
        isCompleted: true,
      },
      {
        id: 's2',
        step: 2,
        title: '퇴근길 예약 프로모션 문구 A/B 시안 만들기',
        description:
          '네이버/카카오 예약 채널에 들어갈 문구를 A/B 2가지 버전으로 준비합니다.',
        expectedOutcome:
          '문구 반응을 비교해 전환이 더 높은 카피로 빠르게 최적화할 수 있습니다.',
        isCompleted: true,
      },
      {
        id: 's3',
        step: 3,
        title: '픽업 동선/대기 구역 안내 문구 추가',
        description:
          '매장 내 픽업 동선과 대기 구역 안내 문구를 눈에 띄게 추가합니다.',
        expectedOutcome:
          '대기 스트레스가 줄어 고객 경험이 개선되고 불만/이탈이 감소합니다.',
        isCompleted: false,
      },
      {
        id: 's4',
        step: 4,
        title: '예약 채널(네이버/카카오) 안내 배너 제작',
        description:
          '테이블/입구에 비치할 예약 채널 안내 배너(QR 포함)를 제작합니다.',
        expectedOutcome:
          '즉시 예약 유도(리드 확보)가 가능해지고 재방문/예약률이 상승합니다.',
        isCompleted: false,
      },
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
      {
        id: 's1',
        step: 1,
        title: '가게 앞 입간판 문구 수정하기',
        description: '입간판 문구를 예약 혜택 중심으로 수정합니다.',
        expectedOutcome: '예약 전환율 상승',
        isCompleted: false,
      },
      {
        id: 's2',
        step: 2,
        title: '예약 동선 안내 문구 추가',
        description: '예약 후 방문 동선과 픽업 안내를 추가합니다.',
        expectedOutcome: '대기/혼선 감소',
        isCompleted: false,
      },
      {
        id: 's3',
        step: 3,
        title: '배너 시안 제작',
        description: '테이블/입구 배너 시안을 제작합니다.',
        expectedOutcome: '유입/인지도 상승',
        isCompleted: false,
      },
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
      {
        id: 's1',
        step: 1,
        title: '이벤트 문구 확정',
        description: '후기 이벤트 참여 조건/혜택 문구를 확정합니다.',
        expectedOutcome: '운영 혼선 감소',
        isCompleted: true,
      },
      {
        id: 's2',
        step: 2,
        title: '포스터 제작',
        description: '매장 부착용 포스터를 제작합니다.',
        expectedOutcome: '후기 참여율 상승',
        isCompleted: true,
      },
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
    if (x.step !== y.step) return false;
    if (x.title !== y.title) return false;
    if (x.description !== y.description) return false;
    if (x.expectedOutcome !== y.expectedOutcome) return false;
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
  return firstTodo?.title ?? null;
}
