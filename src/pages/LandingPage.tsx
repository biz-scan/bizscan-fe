import { useNavigate } from 'react-router-dom';

import SearchIcon from '@/assets/icons/Icon/type=0.svg?react';
import GraphIcon from '@/assets/icons/Icon/type=1.svg?react';
import MarketingIcon from '@/assets/icons/Icon/type=2.svg?react';
import ConsultingIcon from '@/assets/icons/Icon/type=3.svg?react';
import MainIcon from '@/assets/icons/Icon/type=main.svg?react';
import DescriptionBox from '@/components/LandingPage/DescriptionBox';
import { Button } from '@/components/ui/Button';

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col w-full h-full justify-center items-center ">
      <section
        className="pt-35 flex flex-col items-center w-full min-w-fit bg-cover bg-top h-[500px]"
        style={{ backgroundImage: "url('/images/background.png')" }}
      >
        <MainIcon className="mb-10 shrink-0" />
        <h2 className="whitespace-nowrap">사장님, 감으로 장사하지 마세요. 데이터로 성공하세요!</h2>
        <p className="text-grey-dark typo-p2-medium mt-2.5 mb-6 whitespace-nowrap">
          AI가 내 가게 상권 분석부터 당장 실행해야 할 마케팅 전략까지 알려드립니다.
        </p>
        <Button onClick={() => navigate('/auth')}>내 가게 무료 진단하기</Button>
      </section>

      <section className="flex flex-col items-center w-full min-w-fit mt-45 shrink-0">
        <SearchIcon className="shrink-0" />
        <h2 className="mt-6 whitespace-nowrap">혹시 이런 고민 있으신가요?</h2>
        <p className="text-grey-dark typo-p2-medium whitespace-nowrap mt-2.5">
          BizScan이 데이터로 명쾌한 해답을 드립니다.
        </p>

        <div className="flex gap-[14px] mt-17 mb-50 shrink-0">
          <DescriptionBox
            icon={<GraphIcon className="shadow" />}
            text1="매출이 왜 자꾸 떨어질까?"
            text2="데이터 기반 원인 분석"
          />
          <DescriptionBox
            icon={<MarketingIcon className="shadow" />}
            text1="마케팅, 도대체 뭐부터 해야하지?"
            text2="AI가 짜주는 맞춤형 실행전략"
          />
          <DescriptionBox
            icon={<ConsultingIcon className="shadow" />}
            text1="전문 컨설팅은 너무 비싼데.."
            text2="비용 걱정 없는 AI 상권 코치"
          />
        </div>
      </section>
    </div>
  );
}
