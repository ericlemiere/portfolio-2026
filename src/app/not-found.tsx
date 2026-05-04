import Link from "next/link";
import FuzzyText from "./components/FuzzyText";

type NotFoundData = {
  notFoundPage?: {
    title?: string;
    paragraph?: string;
  };
};

export default async function NotFound() {
  return (
    <Link href="/">
      <div className="relative h-screen w-screen overflow-hidden">
        <div className="w-full h-full flex flex-col items-center justify-center gap-4">
          <FuzzyText color="#FFF" fontSize="max(5rem,2.5vw)">
            This page does not exist.
          </FuzzyText>

          <FuzzyText color="#FFF" fontSize="max(1.75rem,2.5vw)">
            Or does it?
          </FuzzyText>

          <div className="mt-12">
            <FuzzyText color="#FFF" fontSize="max(1rem,2vw)">
              Click anywhere to return Home
            </FuzzyText>
          </div>
        </div>
      </div>
    </Link>
  );
}
