import { ModuleMock } from "./mocks";
import type { ModuleId } from "./modules";

export default function ModuleMockFrame({ id }: { id: ModuleId }) {
  return (
    <div
      style={{
        aspectRatio: "4 / 3",
        background:
          "linear-gradient(var(--line) 1px, transparent 1px) 0 0 / 40px 40px, linear-gradient(90deg, var(--line) 1px, transparent 1px) 0 0 / 40px 40px, var(--bg-alt)",
        border: "1px solid var(--line)",
        borderRadius: 8,
        position: "relative",
        padding: 28,
      }}
    >
      <ModuleMock id={id} />
    </div>
  );
}
