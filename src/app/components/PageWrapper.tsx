interface PageWrapperProps {
  children: React.ReactNode;
  contentClassName?: string;
  wrapperClassName?: string;
}

export function PageWrapper({
  children,
  contentClassName = "space-y-4 md:space-y-10",
  wrapperClassName = "min-h-full flex flex-col justify-center",
}: PageWrapperProps) {
  const colorClasses = {
    blue: "text-blue",
    pink: "text-pink",
    orange: "text-orange",
  };

  return (
    <div className={wrapperClassName}>
      <div className={contentClassName}>{children}</div>
    </div>
  );
}
