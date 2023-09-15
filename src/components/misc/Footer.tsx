import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-32 w-full h-44 border-t border-input flex flex-col items-center justify-center">
      <span className="text-center">
        Built made with ❤️, ☕ and a shit ton of 💤 By{" "}
        <Link
          href="https://skylerx.ir?ref=cypher&location=footer"
          className="text-green-400"
        >
          SkylerX
        </Link>
      </span>
      <span className="text-center">
        Released under the{" "}
        <Link
          href="https://www.gnu.org/licenses/agpl-3.0.en.html"
          className="text-green-400"
        >
          GNU Affero General Public License version 3 (AGPL-3.0)
        </Link>{" "}
        license. Hosted on{" "}
        <Link href="https://vercel.com" className="text-green-400">
          Vercel
        </Link>
      </span>
      <span className="text-center">
        Created with{" "}
        <Link href="https://nextjs.org" className="text-green-400">
          NextJS
        </Link>
        ,{" "}
        <Link href="https://prisma.io" className="text-green-400">
          Prisma
        </Link>
        ,{" "}
        <Link href="https://mongodb.com" className="text-green-400">
          Mongoose
        </Link>
      </span>
    </footer>
  );
}
