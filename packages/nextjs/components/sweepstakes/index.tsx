import GenericModal from "../scaffold-stark/CustomConnectButton/GenericModal";
import { StepTracker } from "../StepTracker";
import { useSweepstakesStore } from "~~/services/store/sweepstakesStore";
import FormStep from "./FormStep";
import ReviewStep from "./ReviewStep";
import toast from "react-hot-toast";

const SweepstakesModal = ({ modalId }: { modalId: string }) => {
  const { step, nextStep, prevStep, isModalOpen, closeModal } = useSweepstakesStore();

  return (
    <GenericModal modalId={modalId} isOpen={isModalOpen} onClose={closeModal}>
      <button className="absolute top-4 right-4" onClick={closeModal}>✕</button>
      <StepTracker step={step} totalSteps={2} />
      {step === 1 ? (
        <FormStep onNext={nextStep} />
      ) : (
        <ReviewStep onBack={prevStep} onConfirm={() => { toast.success("Sweepstakes Configured!"); closeModal(); }} />
      )}
    </GenericModal>
  );
};


export default SweepstakesModal;