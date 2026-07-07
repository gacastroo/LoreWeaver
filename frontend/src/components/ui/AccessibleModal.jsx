import { useEffect, useId, useRef } from "react";

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

export default function AccessibleModal({
  title,
  children,
  onClose,
  labelledBy,
  className = "bg-white rounded-xl p-6 w-full max-w-md shadow-lg",
}) {
  const generatedTitleId = useId();
  const titleId = labelledBy || generatedTitleId;
  const panelRef = useRef(null);
  const previouslyFocusedRef = useRef(null);

  useEffect(() => {
    previouslyFocusedRef.current = document.activeElement;
    const panel = panelRef.current;
    if (!panel) return undefined;

    const focusable = panel.querySelector(FOCUSABLE_SELECTOR);
    window.setTimeout(() => {
      (focusable || panel).focus();
    }, 0);

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose?.();
        return;
      }

      if (event.key !== "Tab") return;

      const elements = Array.from(panel.querySelectorAll(FOCUSABLE_SELECTOR));
      if (elements.length === 0) {
        event.preventDefault();
        panel.focus();
        return;
      }

      const first = elements[0];
      const last = elements[elements.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocusedRef.current?.focus?.();
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/40 cursor-default"
        aria-label="Cerrar modal"
        onClick={onClose}
      />
      <section
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className={`relative ${className}`}
      >
        {title ? (
          <h2 id={titleId} className="text-xl font-semibold text-neutral-800 mb-4">
            {title}
          </h2>
        ) : null}
        {children}
      </section>
    </div>
  );
}
