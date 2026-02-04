import { useNavigate } from 'react-router-dom';
import { useGetSwots } from '@/apis/analysis/analysisHooks';
import SwotCard from '@/components/DashboardPage/SwotCard';
import SimbolLogo from '@/assets/icons/Logo/Simbol.svg?react';
import ArrowGray from '@/assets/icons/Arrow/gray.svg?react';
import LineIcon from '@/assets/icons/Line/Line.svg?react';

interface DashboardPageProps {
  userName?: string;
}

const SWOT_TITLES = {
  S: 'Strengths',
  W: 'Weaknesses',
  O: 'Opportunities',
  T: 'Threats',
};

export default function DashboardPage({ userName = 'OOOO' }: DashboardPageProps) {
  const navigate = useNavigate();

  const handleDetailClick = () => {
    navigate('/report');
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  };

  const handleSolutionClick = (id: string) => {
    navigate(`/solution/${id}`);
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  };

  const { data: swotResponse } = useGetSwots();
  const swotList = swotResponse?.result || [];

  const solutionText = "오후 5시 '직장인 퇴근길' 예약 프로모션";
  const tags = ['#객단가UP', '#난이도하', '#마케팅'];

  return (
    <main className="w-full min-h-screen bg-grey-light">
      {/* 상단 히어로 섹션 */}
      <div
        className="w-full bg-no-repeat bg-[center_20%] aspect-[1588/400] bg-cover max-h-[400px] min-h-[250px] flex items-center justify-center"
        style={{ backgroundImage: "url('/images/background.png')" }}
      >
        <div className="flex flex-col items-center">
          <h1 className="text-center text-Grey-Darker text-[clamp(28px,4vw,48px)]">
            반갑습니다, {userName} 님!
          </h1>
          <div className="mt-[28px] flex px-[24px] py-[12px] justify-center items-center rounded-[8px] bg-gra2-right shadow-md">
            <span className="text-blue-light text-[clamp(14px,1.2vw,16px)] font-normal whitespace-nowrap">
              성수동 직장인 회식 1타
            </span>
          </div>
        </div>
      </div>

      <div className="w-full max-w-[1400px] mx-auto px-[clamp(20px,5vw,48px)]">
        {/* AI SWOT 분석 타이틀 */}
        <div className="mt-[clamp(40px,10vw,120px)] flex justify-between items-center">
          <div className="flex items-center gap-[20px]">
            <SimbolLogo className="w-[42px] h-[42px] aspect-square shrink-0" />
            <h2 className="text-blue-dark text-[clamp(24px,3vw,32px)]">AI SWOT 분석</h2>
          </div>
          <button
            onClick={handleDetailClick}
            className="flex px-[20px] py-[10px] justify-center items-center gap-[10px] border border-grey-normal rounded-[8px] transition-all hover:bg-gray-50 active:scale-95"
          >
            <span className="text-grey-normal typo-p2-semibold whitespace-nowrap">자세히 보기</span>
            <ArrowGray className="w-4 h-4 shrink-0" />
          </button>
        </div>

        {/* SWOT 카드 그리드 */}
        <div className="mt-[48px] grid grid-cols-1 md:grid-cols-2 gap-[20px]">
          {swotList.map((item) => (
            <SwotCard
              key={item.swotId}
              type={item.type}
              title={SWOT_TITLES[item.type]}
              keyword={item.keyword}
              description={item.description}
            />
          ))}
        </div>

        {/* 라인 구분선 */}
        <div className="mt-[clamp(60px,10vw,140px)] flex justify-center w-full overflow-hidden">
          <LineIcon className="w-full h-auto text-transparent" />
        </div>

        {/* AI 추천 핵심 솔루션 타이틀 */}
        <div className="mt-[clamp(60px,10vw,140px)] flex justify-between items-center">
          <div className="flex items-center gap-[20px]">
            <SimbolLogo className="w-[42px] h-[42px] aspect-square shrink-0" />
            <h2 className="text-blue-dark text-[clamp(24px,3vw,32px)]">AI 추천 핵심 솔루션</h2>
          </div>
        </div>

        {/* 핵심 솔루션 */}
        <div className="mt-[clamp(24px,4vw,48px)] w-full max-w-[1348px] mx-auto rounded-[20px] bg-grey-light shadow-normal px-[clamp(20px,5vw,48px)] py-[30px] flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex flex-col gap-[16px]">
            <p className="text-grey-darker text-[clamp(18px,2vw,24px)] font-semibold">
              {solutionText}
            </p>
            <div className="flex flex-wrap gap-[8px]">
              {tags.map((tag, idx) => (
                <div
                  key={idx}
                  className="flex px-[10px] py-[4px] justify-center items-center rounded-[4px] bg-blue-light whitespace-nowrap"
                >
                  <span className="text-blue-dark typo-p2-medium">{tag}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => handleSolutionClick('s1')}
            className="flex px-[20px] py-[10px] justify-center items-center gap-[10px] border border-grey-normal rounded-[8px] transition-all hover:bg-gray-50 active:scale-95"
          >
            <span className="text-grey-normal typo-p2-semibold whitespace-nowrap">자세히 보기</span>
            <ArrowGray className="w-4 h-4 shrink-0" />
          </button>
        </div>

        <div className="h-[clamp(40px,10vw,100px)]" />
      </div>
    </main>
  );
}
