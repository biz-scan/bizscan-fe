import BizScanLogo from '@/assets/icons/Logo/Logo.svg?react';

export default function Footer() {
  return (
    <footer className="w-full bg-grey-light-hover">
      <div className="mx-auto w-full max-w-[1348px] py-10 text-p2 text-grey-dark">
        <div className="grid grid-cols-2 gap-y-6">
          <div className="flex flex-col gap-4 typo-p2-medium">
            <BizScanLogo className="h-10 w-fit" />
            <p>데이터에서 실행으로, 내 가게 성공 레시피</p>
          </div>

          <div className="flex justify-end typo-p2-medium">
            <p>Contact. bizscan@gmail.com</p>
          </div>

          <div className="col-span-2 flex items-center justify-between w-full">
            <p className="typo-p2-semibold">
              Copyright ⓒ BizScan. All rights reserved
            </p>

            <div className="flex items-center gap-4 typo-p2-medium">
              <span>이용안내</span>
              <span>|</span>
              <span className="typo-p2-semibold">개인정보처리방침</span>
              <span>|</span>
              <span>운영정책</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
