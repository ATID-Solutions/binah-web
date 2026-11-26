import { ModuleMock } from "./mocks";
import type { ModuleId } from "./modules";

export default function ModuleMockFrame({ id }: { id: ModuleId }) {
  return (
    <div className="module-mock-frame">
      <ModuleMock id={id} />
    </div>
  );
}
