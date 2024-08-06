import "@/styles/global.css";
import { Cards } from "@/components/cards";
import { Filter } from "@/components/filters";

export function IndexPage() {
  return (
    <div className="flex max-h-screen flex-col">
      <div className="container mx-auto flex gap-8 p-8 px-5">
        <Filter />
        <Cards />
      </div>
    </div>
  );
}
