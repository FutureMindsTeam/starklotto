import { useSweepstakesStore } from "~~/services/store/sweepstakesStore";
import { Button } from "../ui/button";

const ReviewStep = ({ onBack, onConfirm }: { onBack: () => void; onConfirm: () => void }) => {
  const { data } = useSweepstakesStore();
  return (
    <div>
      <h2 className="text-xl font-bold">Review Details</h2>
      <div className="mt-4">
        <div className="mb-2">
          <strong>Start Date:</strong> {data.startDate}
        </div>
        <div className="mb-2">
          <strong>End Date:</strong> {data.endDate}
        </div>
        <div className="mb-2">
          <strong>Draw Date:</strong> {data.drawDate}
        </div>
        <div className="mb-2">
          <strong>Ticket Price:</strong> ${data.ticketPrice}
        </div>
        <div className="mb-2">
          <strong>Main Prize:</strong> {data.mainPrize}%
        </div>
        <div className="mb-2">
          <strong>Secondary Prize:</strong> {data.secondaryPrize}%
        </div>
        <div className="mb-2">
          <strong>Protocol Fee:</strong> {data.protocolFee}%
        </div>
      </div>
      <div className="flex justify-between mt-4">
        <Button variant="outline" onClick={onBack}>Back</Button>
        <Button onClick={onConfirm}>Confirm</Button>
      </div>
    </div>
  );
};

export default ReviewStep;