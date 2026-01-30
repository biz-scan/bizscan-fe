import SwotCard from '@/components/DashboardPage/SwotCard';
import SimbolLogo from '@/assets/icons/Logo/Simbol.svg?react';
import ArrowGray from '@/assets/icons/Arrow/gray.svg?react';

interface DashboardPageProps {
  userName?: string;
}

export default function DashboardPage({ userName = 'OOOO' }: DashboardPageProps) {
<<<<<<< HEAD
  return (
<<<<<<< HEAD
<<<<<<< HEAD
    <div className="flex items-center justify-center w-full min-h-screen bg-white">
      <h1 className="text-[24px] font-bold text-gray-800">사이드바 테스트</h1>
=======
<<<<<<< HEAD
    <div>
      <h1 className="text-2xl font-bold mb-4">대시보드</h1>
      <p className="text-gray-500">대시보드 내용이 들어갈 영역입니다.</p>
>>>>>>> eaa9d8b ([Feat]: 사이드바 공용 컴포넌트)
=======
    <div
      className="w-full bg-no-repeat bg-[center_20%] aspect-[1588/400] bg-cover max-h-[400px] min-h-[250px] flex items-center justify-center"
      style={{ backgroundImage: "url('/images/background.png')" }}
    >
      <div className="flex flex-col items-center">
        <h1 className="text-center text-Grey-Darker font-pretendard text-[clamp(28px,4vw,48px)] font-extrabold leading-[140%] tracking-[-1.2px]">
          반갑습니다, {userName} 님!
        </h1>
=======
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
>>>>>>> fe712ff ([Feat]: SWOT 분석 카드 컴포넌트 구현 및 반응형 레이아웃 적용)

  return (
    <main className="w-full min-h-screen bg-grey-light">
      {/*상단 히어로 섹션*/}
      <div
        className="w-full bg-no-repeat bg-[center_20%] aspect-[1588/400] bg-cover max-h-[400px] min-h-[250px] flex items-center justify-center"
        style={{ backgroundImage: "url('/images/background.png')" }}
      >
        <div className="flex flex-col items-center">
          <h1 className="text-center text-Grey-Darker font-pretendard text-[clamp(28px,4vw,48px)] font-extrabold leading-[140%] tracking-[-1.2px]">
            반갑습니다, {userName} 님!
          </h1>

          <div className="mt-[28px] flex px-[24px] py-[12px] justify-center items-center rounded-[8px] bg-gra2-right shadow-md">
            <span className="text-blue-light font-pretendard text-[clamp(14px,1.2vw,16px)] font-normal leading-[140%] tracking-[-0.4px] whitespace-nowrap">
              성수동 직장인 회식 1타
            </span>
          </div>
        </div>
      </div>
<<<<<<< HEAD
>>>>>>> 15c31cb ([Feat]: 대시보드 히어로 섹션 구현 및 반응형 레이아웃 최적화)
    </div>
=======

      {/*본문 타이틀*/}
      <div className="w-full max-w-[1400px] mx-auto px-[20px]">
        <div className="mt-[clamp(40px,10vw,100px)] flex justify-between items-center">
          <div className="flex items-center gap-[20px]">
            <SimbolLogo className="w-[42px] h-[42px] aspect-square shrink-0" />

            <h2 className="text-blue-dark font-pretendard text-[clamp(24px,3vw,32px)] font-bold leading-[140%] tracking-[-0.8px]">
              AI SWOT 분석
            </h2>
          </div>
          <button className="flex px-[20px] py-[10px] justify-center items-center gap-[10px] border border-grey-normal rounded-[8px] transition-all hover:bg-gray-50 active:scale-95">
            <span className="text-grey-normal font-pretendard text-[16px] font-semibold leading-[140%] tracking-[-0.4px] whitespace-nowrap">
              자세히 보기
            </span>
            <ArrowGray className="w-4 h-4 shrink-0" />
          </button>
        </div>

        {/*SWOT 카드 그리드*/}
        <div className="mt-[48px] grid grid-cols-1 md:grid-cols-2 gap-[20px] pb-20">
          {swotData.map((item, index) => (
            <SwotCard
              key={index}
              type={item.type}
              title={item.title}
              keyword={item.keyword}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </main>
>>>>>>> fe712ff ([Feat]: SWOT 분석 카드 컴포넌트 구현 및 반응형 레이아웃 적용)
  );
}
