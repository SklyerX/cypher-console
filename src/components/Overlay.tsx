interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode | React.ReactElement;
}

export default function Overlay({ children, ...props }: Props) {
  return (
    <div
      className="w-full h-full fixed top-0 left-0 bg-white/30 z-50"
      {...props}
    >
      {children}
    </div>
  );
}
