interface ServiceCardProps {
  iconPath: string;
  title: string;
  items: string[];
}

export default function ServiceCard({
  iconPath,
  title,
  items,
}: ServiceCardProps) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-md hover:shadow-lg transition p-6">
      <div className="flex items-center space-x-3 mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 640"
          className="w-8 h-8 fill-[#EA2849]"
        >
          <path d={iconPath} />
        </svg>
        <h3 className="text-xl font-bold text-black">{title}</h3>
      </div>
      <ul className="list-disc list-inside text-gray-700 space-y-1">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
