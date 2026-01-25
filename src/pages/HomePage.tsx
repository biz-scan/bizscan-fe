import IconArrowRight from '@/assets/icons/Arrow/white.svg?react';
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

export default function HomePage() {
  return (
    <div className="flex flex-col items-center gap-10 p-10">
      <div className="flex flex-col items-center gap-4">
        {/* shadcn/ui 테스트 */}
        <div className="pt-4 border-t border-grey-light">
          {/* 타이포 테스트 */}
          <h3 className="text-grey-normal text-p2-semibold mb-4">shadcn/ui Test</h3>
          {/* 버튼 */}
          <div className="flex gap-2">
            <Button size="lg" className="w-[200px] justify-between">
              디폴트
              <IconArrowRight />
            </Button>
            <Button variant="white">white</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="blueLight">blueLight</Button>
          </div>
          {/* 인풋 & 라벨 */}
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" placeholder="Email" />
            <Input type="password" id="email" placeholder="비밀번호" />
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
