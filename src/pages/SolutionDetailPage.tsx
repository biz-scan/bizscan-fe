import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SimbolLogo from '@/assets/icons/Logo/Simbol.svg?react';
import CloseActive from '@/assets/icons/Close/state=active.svg?react';
import CloseHover from '@/assets/icons/Close/state=hover.svg?react';
import LineIcon from '@/assets/icons/Line/Line.svg?react';
import RectangleIcon from '@/assets/icons/SolutionDetailPage/Rectangle.svg';
import CheckIcon from '@/assets/icons/Icon/type=check.svg?react';
import ArrowWhite from '@/assets/icons/Arrow/white.svg?react';

export default function SolutionDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // 나중에 id를 통해 실제 데이터를 매칭하도록 수정 필요!
  const allSolutions = {
    s1: {
      title: "오후 5시 '직장인 퇴근길' 예약 프로모션",
      tags: ['#객단가UP', '#난이도하', '#마케팅'],
      aiReason:
        '이 전략은 현재 고객님의 매장 위치가 오피스 상권임을 고려할 때, 퇴근 시간 유동 인구를 선점하여 비어있는 저녁 시간대 테이블 회전율을 높이는 데 가장 효과적입니다.',
      guides: [
        "네이버 플레이스 > 새소식에 '18시 이전 예약 시 10% 할인' 글 올리기",
        '가게 앞 입간판에 "사원증 보여주면 음료 서비스" 적기',
        '직원들에게 "직장인 손님 오면 명함 이벤트 안내" 교육하기',
      ],
    },
    s2: {
      title: '평일 런치 한정 메뉴 구성',
      tags: ['#회전율UP', '#가성비', '#메뉴개발'],
      aiReason:
        '주변 직장인들의 점심 시간은 한정되어 있습니다. 빠른 회전율을 보장하는 1인 세트 메뉴 구성은 대기 시간을 줄이고 점심 피크 타임 매출을 극대화할 수 있는 전략입니다.',
      guides: [
        '런치 타임 전용 1인 세트 메뉴판 제작',
        "키오스크 메인 화면에 '직장인 추천 메뉴' 배치",
        '점심 시간 주문 후 10분 내 서빙 보장 프로모션',
      ],
    },
  };

  const solutionData = allSolutions[id as keyof typeof allSolutions] || allSolutions.s1;

  return (
    <main className="w-full min-h-screen bg-grey-light pb-[100px]">
      <div className="mx-auto w-full max-w-[1348px] pt-[120px] px-6 md:px-10 xl:px-[60px]">
        {/* 맞춤 실행 전략 헤더 */}
        <div className="flex justify-between items-start mb-[clamp(32px,4vw,48px)]">
          <div className="flex items-center gap-[20px]">
            <SimbolLogo className="w-[42px] h-[42px]" />
            <h2 className="text-blue-dark text-[clamp(24px,3vw,32px)] font-bold leading-[140%] tracking-[-0.8px]">
              맞춤 실행 전략
            </h2>
          </div>

          <button
            onClick={() => navigate(-1)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="transition-transform active:scale-95"
          >
            {isHovered ? (
              <CloseHover className="w-[32px] h-[32px]" />
            ) : (
              <CloseActive className="w-[32px] h-[32px]" />
            )}
          </button>
        </div>

        <section className="flex flex-col">
          <h1 className="text-grey-darker font-pretendard text-[clamp(20px,2.5vw,32px)] font-bold leading-[140%] tracking-[-0.8px]">
            {solutionData.title}
          </h1>

          <div className="flex flex-wrap gap-[8px] mt-[20px]">
            {solutionData.tags.map((tag, idx) => (
              <div
                key={idx}
                className="flex px-[10px] py-[4px] justify-center items-center gap-[2px] rounded-[4px] bg-blue-light whitespace-nowrap"
              >
                <span className="text-blue-dark font-pretendard text-[16px] font-medium leading-[140%] tracking-[-0.4px]">
                  {tag}
                </span>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-[26px] flex justify-center w-full overflow-hidden">
          <LineIcon className="w-full h-auto text-transparent" />
        </div>

        <section className="flex flex-col items-start">
          {/* AI 추천 이유 */}
          <div className="mt-[60px] flex items-center mb-[20px]">
            <img src={RectangleIcon} alt="rect" className="w-[3px] h-[20px]" />
            <h5 className="ml-[16px] text-blue-normal font-pretendard text-[24px] font-bold leading-[140%] tracking-[-0.6px]">
              AI 추천 이유
            </h5>
          </div>

          <div className="w-full max-w-[1348px] min-h-[200px] aspect-auto md:aspect-[1348/360] rounded-[20px] bg-grey-light shadow-[0_4px_20px_0_rgba(49,49,49,0.08)] flex flex-col items-start p-[clamp(24px,3vw,48px)]">
            <p className="text-grey-darker font-pretendard text-[clamp(16px,1.5vw,20px)] font-normal leading-[140%] tracking-[-0.5px] whitespace-pre-wrap">
              {solutionData.aiReason}
            </p>
          </div>
        </section>

        {/* 세부 실행 가이드 */}
        <section className="mt-[60px] w-full flex flex-col">
          <div className="flex items-center mb-[20px]">
            <img src={RectangleIcon} alt="rect" className="w-[3px] h-[20px]" />
            <h5 className="ml-[16px] text-blue-normal text-[24px] font-bold tracking-[-0.6px]">
              세부 실행 가이드
            </h5>
          </div>

          <div className="flex flex-col gap-[20px] w-full">
            {solutionData.guides.map((text, index) => (
              <div
                key={index}
                className="flex items-center w-full min-h-[110px] py-[20px] px-[clamp(24px,5vw,48px)] rounded-[20px] border border-blue-normal bg-grey-light shadow-[0_4px_20px_0_rgba(49,49,49,0.08)] transition-all"
              >
                <CheckIcon className="w-[54px] h-[54px] flex-shrink-0" />

                <span className="ml-[32px] text-grey-darker text-[clamp(16px,2vw,20px)] font-semibold leading-[140%] tracking-[-0.5px]">
                  {text}
                </span>
              </div>
            ))}
          </div>

          <button
            className="mt-[52px] self-end flex px-[26px] py-[18px] justify-center items-center gap-[44px] flex-wrap rounded-[8px] bg-blue-normal text-grey-light transition-all active:scale-95 shadow-md"
            onClick={() => {
              /* 담기 로직  */
            }}
          >
            <span className="font-pretendard text-[20px] font-bold leading-[140%] tracking-[-0.5px]">
              내 실행 노트에 담기
            </span>
            <ArrowWhite className="w-[24px] h-[24px] flex-shrink-0" />
          </button>
        </section>

        <div className="h-[clamp(100px,15vw,241px)]" />
      </div>
    </main>
  );
}
