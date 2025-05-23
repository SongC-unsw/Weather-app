"use client";
type Props = {
  onHandleLocation: () => void;
};
import { Button } from "@/components/ui/button";

export default function GetLocation({ onHandleLocation }: Props) {
  const handleLocation = () => {
    if (onHandleLocation) {
      onHandleLocation();
    }
  };
  return (
    <div>
      <Button onClick={handleLocation}>Get Location</Button>
    </div>
  );
}
