import FieldLabel from '@/components/common/FieldLabel';
import FormRow from '@/components/SettingsPage/FormRow';
import { Input } from '@/components/ui/Input';
import { useAddressSearch } from '@/hooks/store';

interface BasicInfoSectionProps {
  storeName: string;
  onStoreNameChange: (value: string) => void;
  location: string;
  onLocationChange: (value: string) => void;
}

export default function BasicInfoSection({
  storeName,
  onStoreNameChange,
  location,
  onLocationChange,
}: BasicInfoSectionProps) {
  const { open: openAddressSearch } = useAddressSearch(onLocationChange);

  return (
    <section className="flex flex-col gap-[100px]">
      <FormRow
        label={
          <div className="lg:flex lg:h-full lg:items-center">
            <FieldLabel text="매장 이름은 무엇인가요?" />
          </div>
        }
      >
        <Input
          className="w-full"
          value={storeName}
          onChange={(e) => onStoreNameChange(e.target.value)}
          placeholder="매장의 이름을 입력해주세요."
        />
      </FormRow>

      <FormRow
        label={
          <div className="lg:flex lg:h-full lg:items-center">
            <FieldLabel text="매장 위치는 어디인가요?" />
          </div>
        }
      >
        <Input
          className="w-full cursor-pointer"
          value={location}
          readOnly
          onClick={openAddressSearch}
          placeholder="클릭하여 주소를 검색하세요"
        />
      </FormRow>
    </section>
  );
}
