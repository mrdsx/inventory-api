import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { ProductView, useProductViewStore } from "@/features/product";

export function ProductViewSelect() {
  const { productView, setProductView } = useProductViewStore();

  return (
    <Select
      value={productView}
      onValueChange={(val) => setProductView(val as ProductView)}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="View..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="grid">Grid view</SelectItem>
        <SelectItem value="rows">Rows view</SelectItem>
      </SelectContent>
    </Select>
  );
}
