const variants = {
  primary:
    "bg-primary text-white hover:bg-primary-dark focus-visible:ring-primary",
  secondary:
    "bg-secondary text-neutral-900 hover:bg-secondary-dark dark:text-neutral-900",
  outline:
    "border-2 border-primary text-primary hover:bg-primary/10 dark:text-primary",
  ghost: "text-neutral-600 hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-800",
};

const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
