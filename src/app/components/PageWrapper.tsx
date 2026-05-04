interface PageWrapperProps {
  title: string;
  accentColor: "blue" | "pink" | "orange";
  children: React.ReactNode;
  contentClassName?: string;
  wrapperClassName?: string;
}

export function PageWrapper({
  title,
  accentColor,
  children,
  contentClassName = "space-y-10",
  wrapperClassName = "min-h-full p-1 md:p-10 flex flex-col justify-center",
}: PageWrapperProps) {
  const colorClasses = {
    blue: "text-blue",
    pink: "text-pink",
    orange: "text-orange",
  };

  return (
    <div className={wrapperClassName}>
      <div className={contentClassName}>
        <h2
          className={`w-full text-md md:text-4xl font-bold tracking-widest md:mb-10 ${colorClasses[accentColor]}`}
        >
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
}
