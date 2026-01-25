export default function OnboardingPage() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-8">
      <h1 className="text-2xl font-bold mb-2">매장 정보 입력</h1>
      <p className="text-gray-500 mb-8">
        서비스 이용을 위해 매장 정보를 입력해주세요.
      </p>

      <div className="space-y-6">
        <p className="text-gray-400 text-center py-12 border-2 border-dashed rounded-lg">
          매장 정보 입력 폼이 들어갈 영역입니다.
        </p>
      </div>
    </div>
  );
}
