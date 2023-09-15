interface Props {
  children: React.ReactNode;
}

export default function FormLayout({ children }: Props) {
  return (
    <>
      <div className="w-full bg-[#151515] max-w-[500px] backdrop-blur-lg rounded-md">
        <div className="flex flex-row items-center gap-1 border-b p-4">
          <div className="w-1 h-1 p-1.5 rounded-full bg-red-500"></div>
          <div className="w-1 h-1 p-1.5 rounded-full bg-yellow-500"></div>
          <div className="w-1 h-1 p-1.5 rounded-full bg-green-500"></div>
        </div>
        <div className="p-4">{children}</div>
      </div>
      {/* error / response / whatever */}
    </>
  );
}
