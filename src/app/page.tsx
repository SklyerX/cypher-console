import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import UseCases from "@/components/showcase/use-cases";
import CodeBlock from "@/components/CodeBlock";
import BaseLayout from "@/components/layouts/BaseLayout";

export default function NoAuthHomePage() {
  return (
    <BaseLayout>
      <div className="relative">
        <div className="w-[600px] sm:hidden h-[400px] blur-2xl bg-purple-600/20 rounded-full absolute top-10 left-4 rotate-45 -z-10"></div>
        <div className="w-[600px] sm:hidden h-[300px] blur-2xl bg-blue-600/20 rounded-full absolute top-48 right-10 rotate-[30deg] -z-10"></div>
        <div className="w-[400px] sm:hidden h-[300px] blur-2xl bg-red-600/20 rounded-full absolute top-60 left-10 rotate-[30deg] -z-10"></div>
        <div className="grid place-items-center mt-10 w-full border-b border-foreground/30 pb-20">
          <h3 className="text-xl md:text-2xl xl:text-3xl leading-7 text-center font-medium">
            Open Source{" "}
            <span className="underline decoration-red-500 underline-offset-1 decoration-wavy">
              Encryption
            </span>{" "}
            &{" "}
            <span className="underline decoration-red-500 underline-offset-1 decoration-wavy">
              Key management
            </span>{" "}
            for developers
          </h3>
          <p className="text-center md:text-base mt-2">
            A developer platform to securley create, manage, delete, and deploy
            keys. Secure your app content, messages, keys, and even request
            bodies 👀
          </p>
          <div className="mt-5">
            <Link
              href="/login"
              className={buttonVariants({ variant: "default" })}
            >
              Get Started
            </Link>
          </div>
        </div>
        <div className="mt-4 p-5 md:grid place-items-center">
          <span className="uppercase text-xs font-medium text-green-500">
            use cases
          </span>
          <h1 className="font-bold text-xl md:text-2xl mt-1">
            Lower the risk of breaches. Raise the bar for attackers.
          </h1>
          <p className="mt-1 text-sm text-center">
            There are many use cases for an encryption package but here are the
            serveral most popular use cases that{" "}
            <Link
              href="https://skylerx.ir?ref=cypher"
              target="_blank"
              className="text-green-400"
            >
              SkylerX
            </Link>{" "}
            uses.
          </p>
          <div className="mt-6">
            <UseCases />
          </div>
        </div>
        <div className="border-t mt-4 p-5 py-10 place-items-center grid border-foreground/30">
          <span className="uppercase text-xs font-medium text-green-500">
            javascript sdks
          </span>
          <h1 className="font-bold text-xl md:text-2xl mt-1">
            Seamlessly integrates with your stack
          </h1>
          <p className="mt-1 text-sm">
            Add the SDK to any of your javascript projects and easily secure
            your apps and credentials
          </p>
          <div className="flex flex-col lg:flex-row lg:items-center mt-10">
            <div>
              <h2 className="text-lg font-semibold">
                Encrypt client or server side
              </h2>
              <p className="text-sm font-light lg:w-9/12">
                Encrypt data using a one-time ephemeral key for each operation
                with Phase client-side SDKs. Secure data server-side or directly
                on your users' devices. Encrypt data using a one-time ephermeral
                key thats unique to each operation. With the Cypher client (SDK)
                you can easily encrypt and decrypt on both server-side and
                client-side
              </p>
              <Link
                href="/docs/intro"
                className={cn(buttonVariants({ variant: "outline" }), "mt-5")}
              >
                Explore SDK
              </Link>
            </div>
            <div className="relative mt-5">
              <CodeBlock />
            </div>
          </div>
        </div>
        <div className="w-full mt-6 grid place-items-center grid-cols-[repeat(3,1fr)] gap-2">
          <div className="p-5 bg-[#212121] rounded-md">
            <Image
              src="/js.png"
              alt="Javascript"
              width={55}
              height={55}
              className="grayscale hover:grayscale-0"
            />
          </div>

          <div className="p-5 bg-[#212121] rounded-md">
            <Image
              src="/ts.png"
              alt="TypeScript"
              width={55}
              height={55}
              className="grayscale hover:grayscale-0"
            />
          </div>

          <div className="p-5 bg-[#212121] rounded-md">
            <Image
              src="/vue.png"
              alt="Vue"
              width={55}
              height={55}
              className="grayscale hover:grayscale-0"
            />
          </div>

          <div className="p-5 bg-[#212121] rounded-md">
            <Image
              src="/react.png"
              alt="React"
              width={55}
              height={55}
              className="grayscale hover:grayscale-0"
            />
          </div>

          <div className="p-5 bg-[#212121] rounded-md">
            <Image
              src="/nextjs.svg"
              alt="NextJS"
              width={55}
              height={55}
              className="grayscale hover:invert"
            />
          </div>

          <div className="p-5 bg-[#212121] rounded-md">
            <Image
              src="/nodejs.png"
              alt="NodeJS"
              width={55}
              height={55}
              className="grayscale hover:grayscale-0"
            />
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}
