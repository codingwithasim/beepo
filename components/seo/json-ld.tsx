import type {
  JsonLdObject,
} from "@/lib/seo";

type JsonLdProps = {
  id: string;
  data: JsonLdObject;
};

function serializeJsonLd(
  data: JsonLdObject
) {
  return JSON.stringify(data).replace(
    /</g,
    "\\u003c"
  );
}

export function JsonLd({
  id,
  data,
}: JsonLdProps) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: serializeJsonLd(data),
      }}
    />
  );
}