

export const StepTracker = ({ step, totalSteps }: { step: number; totalSteps: number }) => {
  return (
    <div className="flex gap-2 items-center mb-4">
      {[...Array(totalSteps)].map((_, i) => (
        <div
          key={i}
          className={`h-2 w-8 rounded-full ${i < step ? "bg-green-500" : "bg-gray-300"}`}
        />
      ))}
    </div>
  );
};