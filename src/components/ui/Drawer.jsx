import { useEffect, useRef } from "react";
import { X } from "lucide-react";

export default function Drawer({ open, onClose, title, children, side = "right" }) {
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex" role="dialog" aria-modal="true" aria-label={title}>
      <div
        className="absolute inset-0 bg-black/40 animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        tabIndex={-1}
        className={`relative ml-auto flex h-full w-full max-w-md flex-col bg-white shadow-2xl animate-slide-in-right dark:bg-neutral-900 ${
          side === "left" ? "mr-auto ml-0" : ""
        }`}
      >
        <div className="flex items-center justify-between border-b border-neutral-200 px-5 py-4 dark:border-neutral-800">
          <h2 className="font-serif text-lg font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            aria-label="Cerrar"
          >
            <X size={20} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
