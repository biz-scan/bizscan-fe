import { useNavigate, useSearchParams } from 'react-router-dom';

import Simbol from '@/assets/icons/Logo/Simbol.svg?react';
import NextGuideCard from '@/components/NotesPage/NextGuideCard';
import NoteListCard from '@/components/NotesPage/NoteListCard';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/ToggleGroup';
import { useActionNotes } from '@/hooks/note/useActionNotes';
import useAuthStore from '@/store/useAuthStore';

type TabValue = 'in_progress' | 'completed';
const DEFAULT_TAB: TabValue = 'in_progress';

function isTabValue(v: string | null): v is TabValue {
  return v === 'in_progress' || v === 'completed';
}

export default function NotesPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const { user, storeId: persistedStoreId } = useAuthStore();

  const nickname = user?.nickname ?? '사용자';

  const storeId = user?.storeId || persistedStoreId;
  const numericStoreId = storeId ? Number(storeId) : undefined;

  const tabParam = searchParams.get('tab');
  const tab: TabValue = isTabValue(tabParam) ? tabParam : DEFAULT_TAB;

  const isCompleted = tab === 'completed';

  const query = useActionNotes(numericStoreId, isCompleted);

  const notes = query.data ?? [];
  const isLoading = query.isLoading;
  const isError = query.isError;
  const error = query.error;

  const handleTabChange = (v: string) => {
    if (!isTabValue(v)) return;
    setSearchParams({ tab: v });
  };

  const filtered = notes;
  return (
    <div className="w-full min-h-screen bg-grey-light">
      <div className="mx-auto w-full max-w-[1348px] py-[120px] px-6 md:px-10 xl:px-[60px]">
        <div className="flex items-center gap-[20px] mb-[48px]">
          <Simbol className="h-[42px] w-[42px]" />
          <h3 className="text-blue-dark">{nickname}님의 실행 노트</h3>
        </div>

        <div className="mt-[36px] w-full border-b-2 border-blue-light-hover" />

        <div className="mt-[24px]">
          <ToggleGroup
            type="single"
            value={tab}
            onValueChange={(v) => {
              if (!v) return;
              handleTabChange(v);
            }}
            className="flex gap-[16px]"
          >
            <ToggleGroupItem value="in_progress" className="rounded-[12px] px-[28px] py-[14px]">
              진행 중
            </ToggleGroupItem>
            <ToggleGroupItem value="completed" className="rounded-[12px] px-[28px] py-[14px]">
              완료
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        <div className="mt-[36px] space-y-[20px]">
          {isLoading ? (
            <div className="rounded-2xl border border-grey-light-active bg-white px-6 py-8">
              <p className="typo-p2-semibold text-grey-darker">불러오는 중입니다...</p>
            </div>
          ) : isError ? (
            <div className="rounded-2xl border border-red-200 bg-white px-6 py-8">
              <p className="typo-p2-semibold text-red-500">실행 노트 목록 조회에 실패했습니다.</p>
              <p className="typo-p3-regular mt-2 text-grey-normal">
                {String((error as Error | undefined)?.message ?? error ?? '')}
              </p>
              <p className="typo-p3-regular mt-2 text-grey-normal">
                storeId: {String(storeId)} / isCompleted: {String(isCompleted)}
              </p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="rounded-2xl border border-grey-light-active bg-white px-6 py-8">
              <p className="typo-p2-semibold text-grey-darker">
                {tab === 'in_progress'
                  ? '아직 진행 중인 실행 계획이 없어요. AI 분석을 통해 발전 전략을 추가해보세요!'
                  : '완료한 실행 계획이 여기에 표시됩니다.'}
              </p>
            </div>
          ) : (
            filtered.map((note) => {
              const guideText = tab === 'in_progress' ? note.nextActionDetailTitle : null;

              return (
                <div
                  key={note.actionPlanId}
                  className="group grid grid-cols-1 gap-[20px] lg:grid-cols-[8fr_5fr]"
                >
                  <NoteListCard
                    note={note}
                    onClick={() => navigate(`/notes/${note.actionPlanId}`)}
                  />
                  {tab === 'in_progress' && guideText ? (
                    <NextGuideCard text={guideText} />
                  ) : (
                    <div />
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
