import { GoBackBtn, PageHeading } from "@/components";
import {
  ScrollArea,
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { FAVORITE_PRODUCTS_TABLE_COLUMNS as tableColumns } from "./components/favorite-products-table-columns";
import { FavoriteProductsTableBodyContent } from "./components/FavoriteProductsTableBodyContent";

export default function FavoriteProductsPage() {
  return (
    <div>
      <GoBackBtn className="mb-2" />
      <PageHeading className="mb-4">Favorite products</PageHeading>
      <ScrollArea className="h-100 rounded-sm border">
        <Table className="h-full rounded-sm">
          <TableHeader className="table-header sticky top-0">
            <TableRow>
              {tableColumns.map((item, index) => (
                <TableHead className={item.headingClassName} key={index}>
                  {item.title}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            <FavoriteProductsTableBodyContent />
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
}
