import DocsSidebar from "@/components/misc/DocsSidebar";
import { MDX } from "@/lib/mdx";
import { allDocs } from "contentlayer/generated";
import { notFound } from "next/navigation";

interface Props {
  params: {
    slug: string;
  };
}

async function getDocFromParams(slug: string) {
  const doc = allDocs.find((doc) => doc.slugAsParams === slug);

  if (!doc) notFound();

  return doc;
}

export default async function Docs({ params }: Props) {
  const doc = await getDocFromParams(params.slug);

  return (
    <>
      <div className="flex overflow-y-hidden">
        <DocsSidebar />
        <div className="lg:ml-80 w-full max-w-[700px] mr-3 lg:mt-12 mt-16 ml-3 overflow-y-scroll">
          <MDX code={doc.body.code} />
        </div>
      </div>
    </>
  );
}
