import { useState } from 'react';
import SwotCard from '@/components/DashboardPage/SwotCard';
import SimbolLogo from '@/assets/icons/Logo/Simbol.svg?react';
import LineIcon from '@/assets/icons/Line/Line.svg?react';

export default function ReportPage() {
  const [selectedType, setSelectedType] = useState<'S' | 'W' | 'O' | 'T' | null>(null);

  const swotData = [
    {
      type: 'S' as const,
      title: 'Strengths',
      keyword: '가격 경쟁력 우수',
      description: '객단가가 주변보다 낮아요',
    },
    {
      type: 'W' as const,
      title: 'Weaknesses',
      keyword: '리뷰 수 부족',
      description: '경쟁사 대비 20% 수준',
    },
    {
      type: 'O' as const,
      title: 'Opportunities',
      keyword: '20대 유동인구 ↑',
      description: '저녁 시간대 급증',
    },
    {
      type: 'T' as const,
      title: 'Threats',
      keyword: '유사 업종 과포화',
      description: '반경 500m 내 150개',
    },
  ];

  const aiAnalysisData = {
    S: '해당 업체는 가격 경쟁력이 우수합니다. 객단가가 주변보다 낮게 책정되어 있고, 경쟁사 대비 가성비 면에서 확실한 우위를 점하고 있습니다.',
    W: '현재 리뷰 수가 절대적으로 부족합니다. 경쟁사 대비 20% 수준으로, 신규 고객들이 방문을 결정하는 데 주저하게 만드는 요인이 될 수 있습니다.',
    O: '성수동 인근 20대 유동인구가 저녁 시간대에 급증하는 추세입니다. 이들을 타겟팅한 감성적인 브랜딩과 야간 메뉴 강화가 필요합니다.',
    T: '반경 500m 이내 유사 업종이 150개로 과포화 상태입니다. 차별화된 핵심 메뉴 없이는 시장 점유율 유지가 어려울 수 있습니다.',
  };

  return (
    <main className="w-full min-h-screen bg-grey-light">
      <div className="mx-auto w-full max-w-[1348px] pt-[120px] px-6 md:px-10 xl:px-[60px]">
        <div className="flex items-center gap-[20px] mb-[48px]">
          <SimbolLogo className="w-[42px] h-[42px]" />
          <h2 className="text-blue-dark text-[32px] font-bold">AI SWOT 분석</h2>
        </div>

        {/* SWOT 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[20px] gap-y-[20px]">
          {swotData.map((item, index) => (
            <SwotCard
              key={index}
              {...item}
              isActive={selectedType === item.type}
              onClick={() => setSelectedType(item.type)}
            />
          ))}
        </div>

        <div className="mt-[clamp(60px,8vw,145px)] flex justify-center w-full overflow-hidden">
          <LineIcon className="w-full h-auto text-transparent" />
        </div>

        {/* AI 정밀 진단 */}
        {selectedType && (
          <>
            <section className="mt-[clamp(60px,8vw,145px)] animate-in fade-in slide-in-from-top-4 duration-500">
              <div className="flex items-center gap-[20px] mb-[clamp(24px,3vw,48px)]">
                <SimbolLogo className="w-[42px] h-[42px]" />
                <h2 className="text-blue-dark text-[clamp(24px,3vw,32px)] font-bold leading-[140%] tracking-[-0.8px]">
                  AI 정밀 진단
                </h2>
              </div>

              <div className="w-full max-w-[1348px] min-h-[200px] aspect-[1348/360] rounded-[20px] bg-grey-light shadow-[0_4px_20px_0_rgba(49,49,49,0.08)] flex flex-col items-start p-[clamp(24px,3vw,48px)]">
                <p className="text-grey-darker font-pretendard text-[clamp(16px,1.5vw,20px)] font-normal leading-[140%] tracking-[-0.5px]">
                  {aiAnalysisData[selectedType]}
                </p>
              </div>
            </section>

            <div className="mt-[clamp(60px,8vw,145px)] flex justify-center w-full overflow-hidden animate-in fade-in duration-700">
              <LineIcon className="w-full h-auto text-transparent" />
            </div>
          </>
        )}
      </div>
    </main>
  );
}
