import { useTheme } from "next-themes";

const GenericModal = ({
  children,
  className = "modal-box relative w-full max-w-[480px] p-6 bg-background border border-purple-500/20 rounded-2xl shadow-2xl",
  modalId,
}: {
  children: React.ReactNode;
  className?: string;
  modalId: string;
}) => {
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";

  return (
    <div className="modal modal-bottom sm:modal-middle backdrop-blur-sm">
      <div className={className}>
        {/* dummy input to capture event onclick on modal box */}
        <input className="h-0 w-0 absolute top-0 left-0" />
        {children}
      </div>
    </div>
  );
};

export default GenericModal;
