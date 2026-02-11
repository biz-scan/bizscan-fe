export default function NextGuideCard({ text }: { text: string }) {
    return (
      <div className="h-full w-full rounded-[20px] border border-blue-light-active shadow-normal bg-grey-light group-hover:bg-grey-light-hover group-active:bg-blue-light">
        <div className="flex h-full flex-col px-[48px] py-[28px]">

          <p className="typo-p2-medium text-grey-normal">다음 세부 가이드</p>
  
          <div className="flex flex-1 items-center">
            <p className="typo-lead-semibold text-blue-dark">{text}</p>
          </div>
        </div>
      </div>
    );
  }
  