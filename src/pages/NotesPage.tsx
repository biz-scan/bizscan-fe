import { useMemo, useState, useSyncExternalStore } from 'react';
import { useNavigate } from 'react-router-dom';

import Simbol from '@/assets/icons/Logo/Simbol.svg?react';
import NextGuideCard from '@/components/NotesPage/NextGuideCard';
import NoteListCard from '@/components/NotesPage/NoteListCard';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/ToggleGroup';
import {
  calcProgress,
  getAllNotesSnapshot,
  getNextGuideText,
  subscribeNotes,
} from '@/mocks/notesMockStore';

export default function NotesPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<'in_progress' | 'completed'>('in_progress');

  const allNotes = useSyncExternalStore(subscribeNotes, getAllNotesSnapshot, getAllNotesSnapshot);

  const filtered = useMemo(() => {
    return allNotes.filter((n) => {
      const p = calcProgress(n.steps).percent;
      return tab === 'completed' ? p === 100 : p < 100;
    });
  }, [allNotes, tab]);

  return (
    <div className="min-h-screen bg-grey-light px-[120px] py-[120px]">
      <div className="mx-auto w-full max-w-[1100px]">

        <div className="flex items-center gap-[8px]">
          <Simbol className="h-[32px] w-[32px]" />
          <h3 className="text-blue-dark">oooo님의 실행 노트</h3>
        </div>

        <div className="mt-[36px] w-full border-b-2 border-blue-light-hover" />

        <div className="mt-[24px]">
          <ToggleGroup
            type="single"
            value={tab}
            onValueChange={(v) => {
              if (!v) return;
              setTab(v as 'in_progress' | 'completed');
            }}
            className="flex gap-[16px]"
          >
            <ToggleGroupItem value="in_progress" className="px-[28px] py-[14px] rounded-[12px]">
              진행 중
            </ToggleGroupItem>
            <ToggleGroupItem value="completed" className="px-[28px] py-[14px] rounded-[12px]">
              완료
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        <div className="mt-[36px] space-y-[20px]">
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-grey-light-active bg-white px-6 py-8">
              <p className="typo-p2-semibold text-grey-darker">
                {tab === 'in_progress'
                  ? '아직 진행 중인 실행 계획이 없어요. AI 분석을 통해 발전 전략을 추가해보세요!'
                  : '완료한 실행 계획이 여기에 표시됩니다.'}
              </p>
            </div>
          ) : (
            filtered.map((note) => {
              const progress = calcProgress(note.steps).percent;
              const guideText = tab === 'in_progress' ? getNextGuideText(note.steps) : null;

              return (
                <div key={note.noteId} className="grid grid-cols-1 gap-[20px] lg:grid-cols-[8fr_5fr]">
                  <NoteListCard
                    note={note}
                    progress={progress}
                    onClick={() => navigate(`/notes/${note.noteId}`)}
                  />

                  {tab === 'in_progress' && guideText ? <NextGuideCard text={guideText} /> : <div />}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
