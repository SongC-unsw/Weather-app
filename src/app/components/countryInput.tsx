"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
type Props = {
  onHandleCheckWeather: (location: string) => void;
};
export default function CountryInput({ onHandleCheckWeather }: Props) {
  const [location, setLocation] = useState("");
  // can use useState to handle input value because this doesn't need to be known by parent component
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onHandleCheckWeather(location);
  };
  return (
    <form className="flex gap-2" onSubmit={handleSubmit}>
      <div className="flex gap-2 items-center">
        <label>City: </label>
        <Input
          type="text"
          placeholder="Enter your location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          // update input value on the fly
        />
      </div>
      <Button
        type="submit"
        variant="default"
        className="bg-blue-500 hover:bg-blue-600"
        // pass input value to parent component only when button is clicked or form is submitted
      >
        Check Weather
      </Button>
      <Button
        type="button"
        variant="outline"
        className="border-red-500 text-red-500 hover:bg-red-50"
        onClick={() => setLocation("")}
      >
        Clear
      </Button>
    </form>
  );
}
