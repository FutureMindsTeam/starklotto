import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sweepstakesSchema, SweepstakesFormValues } from "~~/utils/validations/sweepstakesSchema";
import { useSweepstakesStore } from "~~/services/store/sweepstakesStore";
import { Button } from "../ui/button";

const FormStep = ({ onNext }: { onNext: () => void }) => {
  const { updateData, data } = useSweepstakesStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SweepstakesFormValues>({
    resolver: zodResolver(sweepstakesSchema),
    defaultValues: data,
  });

  const onSubmit = (values: SweepstakesFormValues) => {
    updateData(values);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 gap-4">
        <FormField label="Start Date" error={errors.startDate?.message}>
          <input type="date" {...register("startDate")} className="border rounded p-2" />
        </FormField>

        <FormField label="End Date" error={errors.endDate?.message}>
          <input type="date" {...register("endDate")} className="border rounded p-2" />
        </FormField>

        <FormField label="Draw Date" error={errors.drawDate?.message}>
          <input type="date" {...register("drawDate")} className="border rounded p-2" />
        </FormField>

        <FormField label="Ticket Price ($)" error={errors.ticketPrice?.message}>
          <input type="number" {...register("ticketPrice")} className="border rounded p-2" />
        </FormField>

        <FormField label="Main Prize (%)" error={errors.mainPrize?.message}>
          <input type="number" {...register("mainPrize")} className="border rounded p-2" />
        </FormField>

        <FormField label="Secondary Prize (%)" error={errors.secondaryPrize?.message}>
          <input type="number" {...register("secondaryPrize")} className="border rounded p-2" />
        </FormField>

        <FormField label="Protocol Fee (%)" error={errors.protocolFee?.message}>
          <input type="number" {...register("protocolFee")} className="border rounded p-2" />
        </FormField>
      </div>

      <Button type="submit" className="w-full mt-4">Next</Button>
    </form>
  );
};

export default FormStep;

// Reusable FormField component
const FormField = ({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) => (
  <div className="flex flex-col">
    <label className="text-base font-medium text-gray-700 dark:text-gray-300">{label}</label>
    {children}
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);
