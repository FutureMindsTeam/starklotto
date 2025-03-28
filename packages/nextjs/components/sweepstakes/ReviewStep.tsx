import { useSweepstakesStore } from "~~/services/store/sweepstakesStore";
import { Button } from "../ui/button";

interface ReviewStepProps {
  onBack: () => void;
  onConfirm: () => void;
  isEditing?: boolean;
}

const ReviewStep = ({ onBack, onConfirm, isEditing = false }: ReviewStepProps) => {
  const { currentEntry, createSweepstakes } = useSweepstakesStore();
  
  const handleConfirm = () => {
    createSweepstakes();
    onConfirm();
  };

  return (
    <div>
      <h2 className="text-xl font-bold">
        {isEditing ? "Review Updated Sweepstakes" : "Review New Sweepstakes"}
      </h2>
      <div className="mt-4">
        {Object.entries(currentEntry).map(([key, value]) => (
          <div key={key} className="mb-2">
            <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>{' '}
            {typeof value === 'number' ? 
              (key.includes('Price') ? `$${value}` : `${value}%`) : 
              value
            }
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-4">
        <Button variant="outline" onClick={onBack}>Back</Button>
        <Button onClick={handleConfirm}>
          {isEditing ? "Update" : "Confirm"}
        </Button>
      </div>
    </div>
  );
};

export default ReviewStep;