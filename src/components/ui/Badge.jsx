export default function Badge({ children, variant = "default" }) {
  const styles = {
    default: "bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300",
    new: "bg-success/15 text-success",
    sale: "bg-error/15 text-error",
    primary: "bg-primary/15 text-primary-dark",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${styles[variant]}`}
    >
      {children}
    </span>
  );
}
