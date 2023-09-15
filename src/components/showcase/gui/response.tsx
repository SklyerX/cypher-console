import clsx from "clsx";

interface Props {
  isError: boolean;
  value?: object;
}

export default function Response({ isError, value }: Props) {
  return (
    <div
      className={clsx(
        "mt-3 w-full border rounded-md p-3 max-w-[500px]",
        isError
          ? "bg-red-500/40 border-red-700"
          : "bg-green-500/40 border-green-700"
      )}
    >
      <pre className="overflow-x-scroll font-mono">
        <code className="overflow-x-hidden">
          {JSON.stringify(value, null, 2)}
        </code>
      </pre>
    </div>
  );
}
