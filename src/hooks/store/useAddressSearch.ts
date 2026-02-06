import { useDaumPostcodePopup } from 'react-daum-postcode';

export function useAddressSearch(onComplete: (address: string) => void) {
  const openPostcode = useDaumPostcodePopup();

  const open = () => {
    openPostcode({
      onComplete: (data) => {
        onComplete(data.address);
      },
    });
  };

  return { open };
}
