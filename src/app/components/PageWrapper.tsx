interface PageWrapperProps {
  title: string;
  accentColor: "blue" | "pink" | "orange";
  children: React.ReactNode;
  contentClassName?: string;
}

export function PageWrapper({
  title,
  accentColor,
  children,
  contentClassName = "space-y-10",
}: PageWrapperProps) {
  const colorClasses = {
    blue: "text-blue",
    pink: "text-pink",
    orange: "text-orange",
  };

  return (
    <div className="h-full overflow-y-auto p-8 sm:p-10 flex flex-col justify-center items-center">
      <div className={contentClassName}>
        <h2
          className={`w-full text-3xl sm:text-4xl font-bold tracking-widest mb-10 ${colorClasses[accentColor]}`}
        >
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
}
