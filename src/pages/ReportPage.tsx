import SwotCard from '@/components/DashboardPage/SwotCard';
import SimbolLogo from '@/assets/icons/Logo/Simbol.svg?react';

export default function ReportPage() {
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

  return (
    <main className="w-full min-h-screen bg-grey-light">
      <div className="mx-auto w-full max-w-[1348px] pt-[120px] px-6 md:px-10 xl:px-[60px]">
        <div className="flex items-center gap-[20px] mb-[48px]">
          <SimbolLogo className="w-[42px] h-[42px]" />
          <h2 className="text-blue-dark text-[32px] font-bold">AI SWOT 분석</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[20px] gap-y-[20px]">
          {swotData.map((item, index) => (
            <SwotCard key={index} {...item} />
          ))}
        </div>
      </div>
    </main>
  );
}
