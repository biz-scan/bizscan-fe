import { Link } from 'react-router-dom';

import DownArrowIcon from '@/assets/icons/Arrow/down.svg?react';
import CloseIcon from '@/assets/icons/Close/state=Default.svg?react';
import CheckIcon from '@/assets/icons/Icon/type=check.svg?react';
import LogoIcon from '@/assets/icons/Logo/Logo.svg?react';
import TuffyIcon from '@/assets/icons/tuffy.svg?react';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import { ChipFilter } from '@/components/ui/ChipFilter';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/RadioGroup';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/ToggleGroup';
import useAuthStore from '@/store/useAuthStore';

export default function HomePage() {
  const { user } = useAuthStore();
  return (
    <div className="flex flex-col items-center gap-10 p-10">
      {/* 기존 내용 */}
      <div className="flex flex-col items-center gap-4">
        <TuffyIcon />
        <h1 className="text-blue-normal">홈</h1>
        <p className="text-p1-regular text-grey-normal">화이팅~!</p>
        <p className="text-p2-medium">이름: {user?.name}</p>
        <Link to="/login" className="text-blue-normal hover:underline">
          로그인 페이지로
        </Link>
      </div>

      {/* 테마 테스트 섹션 */}
      <div className="flex flex-col gap-6 w-full max-w-md p-8 bg-white shadow-normal rounded-lg">
        <h2 className="text-blue-normal">Theme Test</h2>

        <div className="space-y-4">
          <div className="p-4 bg-gra2 text-white rounded shadow-header">
            <h3 className="text-white">Gradient & Shadow</h3>
            <p className="text-p2-medium">bg-gra2 + shadow-header</p>
          </div>

          <div className="flex gap-2">
            <div className="flex-1 h-12 bg-blue-light flex items-center justify-center rounded text-blue-dark active:bg-blue-light-active">
              Light
            </div>
            <div className="flex-1 h-12 bg-blue-normal flex items-center justify-center rounded text-white hover:bg-blue-normal-hover">
              Normal
            </div>
            <div className="flex-1 h-12 bg-blue-darker flex items-center justify-center rounded text-white active:bg-blue-dark-active">
              Darker
            </div>
          </div>

          <p className="text-error text-p2-semibold">Error Message Test (P2-Semibold)</p>
          <p className="text-lead-semibold text-grey-dark">Lead Semibold Test</p>
        </div>

        {/* 아이콘 테스트 */}
        <div className="pt-4 border-t border-grey-light">
          <h3 className="text-grey-normal text-p2-semibold mb-4">Icon Test</h3>
          <div className="flex gap-6 items-center">
            <div className="flex flex-col items-center gap-1">
              <LogoIcon width={80} />
              <span className="text-xs text-grey-normal">Logo</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <DownArrowIcon />
              <span className="text-xs text-grey-normal">Arrow</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <CloseIcon />
              <span className="text-xs text-grey-normal">Close</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <CheckIcon width={24} height={24} />
              <span className="text-xs text-grey-normal">Check</span>
            </div>
          </div>
        </div>

        {/* shadcn/ui 테스트 */}
        <div className="pt-4 border-t border-grey-light">
          <h3 className="text-grey-normal text-p2-semibold mb-4">shadcn/ui Test</h3>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Button>Default Button</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" placeholder="Email" />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <Label htmlFor="terms">Accept terms and conditions</Label>
            </div>

            <RadioGroup defaultValue="option-one">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-one" id="option-one" />
                <Label htmlFor="option-one">Option One</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-two" id="option-two" />
                <Label htmlFor="option-two">Option Two</Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        {/* Chip Filter & Dropdown 테스트 */}
        <div className="pt-4 border-t border-grey-light">
          <h3 className="text-grey-normal text-p2-semibold mb-4">Chip & Dropdown Test</h3>
          <div className="space-y-4">
            <div className="flex gap-2">
              <ChipFilter active>Active Chip</ChipFilter>
              <ChipFilter>Default Chip</ChipFilter>
              <ChipFilter>Filter 1</ChipFilter>
            </div>

            <div className="w-full max-w-sm">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Option 1</SelectItem>
                  <SelectItem value="2">Option 2</SelectItem>
                  <SelectItem value="3">Option 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Single Selection (Segmented Control) 테스트 */}
        <div className="pt-4 border-t border-grey-light">
          <h3 className="text-grey-normal text-p2-semibold mb-4">Single Selection Test</h3>
          <div className="space-y-4">
            <ToggleGroup type="single" variant="outline" defaultValue="one">
              <ToggleGroupItem value="one">Option 1</ToggleGroupItem>
              <ToggleGroupItem value="two">Option 2</ToggleGroupItem>
              <ToggleGroupItem value="three">Option 3</ToggleGroupItem>
              <ToggleGroupItem value="four">Option 4</ToggleGroupItem>
            </ToggleGroup>

            <ToggleGroup
              type="single"
              variant="default"
              defaultValue="one"
              className="bg-grey-light p-1 rounded-lg"
            >
              <ToggleGroupItem value="one" className="rounded-md data-[state=on]:shadow-sm">
                Choice A
              </ToggleGroupItem>
              <ToggleGroupItem value="two" className="rounded-md data-[state=on]:shadow-sm">
                Choice B
              </ToggleGroupItem>
              <ToggleGroupItem value="three" className="rounded-md data-[state=on]:shadow-sm">
                Choice C
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
      </div>
    </div>
  );
}
