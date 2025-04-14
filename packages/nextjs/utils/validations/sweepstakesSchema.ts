import { z } from "zod";

export const sweepstakesSchema = z.object({
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  drawDate: z.string().min(1, "Draw date is required"),
  ticketPrice: z.preprocess(
    (val) => Number(val),
    z.number().min(1, "Ticket price must be at least 1"),
  ),
  mainPrize: z.preprocess(
    (val) => Number(val),
    z
      .number()
      .min(1, "Main prize percentage must be at least 1%")
      .max(100, "Main prize cannot exceed 100%"),
  ),
  secondaryPrize: z.preprocess(
    (val) => Number(val),
    z
      .number()
      .min(0, "Secondary prize must be at least 0%")
      .max(100, "Secondary prize cannot exceed 100%"),
  ),
  protocolFee: z.preprocess(
    (val) => Number(val),
    z
      .number()
      .min(0, "Protocol fee must be at least 0%")
      .max(100, "Protocol fee cannot exceed 100%"),
  ),
});

export type SweepstakesFormValues = z.infer<typeof sweepstakesSchema>;
