export function Catalog({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-100 gap-4 transition-colors">
      <div className="flex w-full flex-col gap-4">{children}</div>
    </div>
  );
}
