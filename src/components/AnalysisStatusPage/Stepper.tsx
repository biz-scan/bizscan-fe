import CheckIcon from '@/assets/icons/Check/Check_Icon.svg?react';

type AnalysisStatus = 'WAITING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';

interface StepperProps {
  status: AnalysisStatus;
}

const STEPS = ['접수', '분석 중', '완료'] as const;

const STATUS_TO_STEP: Record<AnalysisStatus, number> = {
  WAITING: 0,
  PROCESSING: 1,
  COMPLETED: 2,
  FAILED: 2,
};

function StepCircle({
  step,
  state,
  isFailed,
}: {
  step: number;
  state: 'completed' | 'current' | 'pending';
  isFailed: boolean;
}) {
  if (state === 'completed' && isFailed) {
    return (
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-error ">
        <h5 className="m-0 text-blue-normal">X</h5>
      </div>
    );
  }

  if (state === 'completed') {
    return (
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gra2-h p-0.5">
        <div className="flex h-full w-full items-center justify-center rounded-full bg-grey-light">
          <CheckIcon className="h-5 w-5" strokeWidth={3} />
        </div>
      </div>
    );
  }

  if (state === 'current') {
    return (
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gra2-h  ">
        <h5 className="m-0 text-grey-light">{step + 1}</h5>
      </div>
    );
  }

  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gra2-h p-0.5">
      <div className="flex h-full w-full items-center justify-center rounded-full bg-grey-light">
        <h5 className="m-0 text-blue-normal">{step + 1}</h5>
      </div>
    </div>
  );
}

function StepLine() {
  return <div className="h-0.5 flex-1 bg-gra2-h" />;
}

export default function Stepper({ status }: StepperProps) {
  const currentStep = STATUS_TO_STEP[status];
  const isFailed = status === 'FAILED';

  const steps = STEPS.map((label, i) => ({
    label,
    state: (i < currentStep ? 'completed' : i === currentStep ? 'current' : 'pending') as
      | 'completed'
      | 'current'
      | 'pending',
    showFailed: isFailed && i === currentStep,
  }));

  return (
    <div className="flex w-full max-w-100 items-center">
      {steps.map(({ state, showFailed }, i) => (
        <div key={i} className="contents">
          {i > 0 && <StepLine />}
          <StepCircle step={i} state={state} isFailed={showFailed} />
        </div>
      ))}
    </div>
  );
}
