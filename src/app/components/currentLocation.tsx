export default function CurrentLocation({ location }: { location: string }) {
  return (
    <div className="text-2xl">
      <span className="font-bold">Location:</span> {location}
    </div>
  );
}
