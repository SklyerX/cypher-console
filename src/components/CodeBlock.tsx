"use client";

import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

function RenderCodeblockContext() {
  return (
    <>
      <span>
        import <span className="text-yellow-600">Cypher</span> from
        '@skylerx/cypher'
      </span>
      <br />
      <br />
      <span className="text-gray-700">// Initialize the SDK</span>
      <br />
      <span>
        const cypher = <span className="text-yellow-500">new</span>{" "}
        <span className="text-red-500">Cypher</span>(&#123;
        <br />
        <div className="ml-1">
          appId: <span className="text-gray-500">APP_ID</span>,
          <br />
          appSecret: <span className="text-gray-500">APP_ID</span>,
          <br />
          JWT_SECRET: <span className="text-gray-500">JWT_SECRET</span>,
        </div>
        &#125;);
      </span>
      <br />
      <br />
      <span className="text-gray-700">// Encrypt the data</span>
      <br />
      <span>
        const <span className="text-green-500">encryptedData</span> = await{" "}
        <span className="text-yellow-600">cypher</span>.
        <span className="text-yellow-600">encrypt</span>(
        <span className="text-red-500">string</span>);
      </span>
      <br />
      <br />
      <span className="text-gray-700">
        // Output will look something like this:
      </span>
      <br />
      <span className="text-gray-700">
        // cy:v1:38014151825b99c641df4a2b35e4ea48
      </span>
      <br />
      <br />
      <span className="text-gray-700">// Decrypt the data</span>
      <br />
      <span>
        const <span className="text-green-500">decrypted</span> = await{" "}
        <span className="text-yellow-600">cypher</span>.
        <span className="text-yellow-600">decrypt</span>(
        <span className="text-red-500">result</span>);
      </span>
      <br />
      <br />
      <span className="text-gray-700">// 0108718230571023</span>
    </>
  );
}

export default function CodeBlock() {
  const [mounted, setMounted] = useState<boolean>(false);

  const isLarge = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted ? (
        <>
          <div className="absolute top-0 text-xs right-6 bg-blue-600 px-3 py-1 rounded-b-md">
            TypeScript
          </div>
          {isLarge ? (
            <pre className="w-full bg-[#131315] rounded-md p-7 font-light">
              <RenderCodeblockContext />
            </pre>
          ) : (
            <div className="w-full bg-[#131315] rounded-md p-7 font-light">
              <RenderCodeblockContext />
            </div>
          )}
        </>
      ) : (
        <p>...</p>
      )}
    </>
  );
}
