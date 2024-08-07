import "@/styles/global.css";
import { Cards } from "@/components/cards";
import { Filter } from "@/components/filters";
import { URLs } from "@/components/urls";

export function IndexPage() {
  return (
    <div className="flex h-screen max-h-screen flex-col justify-between">
      <div className="container mx-auto flex gap-8 p-8 px-5">
        <Filter />
        <Cards />
      </div>
      <URLs />
    </div>
  );
}
