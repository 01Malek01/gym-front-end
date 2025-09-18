type PageHeaderProps = {
  title: string;
};

export default function PageHeader({ title }: PageHeaderProps) {
  return (
    <h1 className="text-4xl md:text-5xl font-extrabold text-teal-400 uppercase tracking-wide mb-8 pb-4 border-b border-indigo-600">
      {title}
    </h1>
  );
}
