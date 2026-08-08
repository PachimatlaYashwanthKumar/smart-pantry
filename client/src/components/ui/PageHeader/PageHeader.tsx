interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export default function PageHeader({
  title,
  subtitle,
  action,
}: PageHeaderProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-2 text-base text-gray-500">
            {subtitle}
          </p>
        )}
      </div>

      {action && <div>{action}</div>}
    </div>
  );
}