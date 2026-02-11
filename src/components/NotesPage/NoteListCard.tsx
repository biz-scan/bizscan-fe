import HashTag from '@/components/NotesPage/HashTag';
import ProgressBar from '@/components/NotesPage/ProgressBar';
import type { ActionNoteListItem } from '@/types/note.type';
import { formatDateDot } from '@/utils/note/date';


function clamp(n: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, n));
}

export default function NoteListCard({
  note,
  onClick,
}: {
  note: ActionNoteListItem;
  onClick: () => void;
}) {
  const progress = clamp(note.progress);

  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-[20px] bg-grey-light group-hover:bg-grey-light-hover group-active:bg-blue-light text-left shadow-normal"
    >
      <div className="px-[48px] py-[32px]">
        <p className="typo-p2-medium text-grey-normal">{formatDateDot(note.createdAt)}. 시작</p>

        <div className="mt-[14px] grid grid-cols-[2fr_1fr] items-end gap-[85px]">
          <div className="min-w-0">
            <p className="typo-lead-semibold text-grey-darker">{note.title}</p>

            <div className="mt-[16px] flex flex-wrap gap-[8px]">
              {note.tags.map((t) => (
                <HashTag key={t.tagId}>{t.content}</HashTag>
              ))}
            </div>
          </div>

          <div className="flex min-w-0 flex-col items-start gap-[12px]">
            <div className="inline-flex items-center justify-center rounded-[8px] border-[1px] border-blue-light-active bg-blue-light px-[16px] py-[4px]">
              <span className="typo-p2-semibold text-blue-normal">{progress}%</span>
            </div>

            <div className="w-full">
              <ProgressBar value={progress} />
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}
