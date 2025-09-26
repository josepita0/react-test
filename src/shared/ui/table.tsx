import * as React from "react";
import { cn } from "../lib/cn";

export function Table({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableElement>) {
  return (
    <table className={cn("w-full text-sm table-auto", className)} {...props} />
  );
}
export function THead(props: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead
      className="sticky top-0 z-10 bg-gray-50/90 backdrop-blur text-slate-600 uppercase tracking-wide text-xs"
      {...props}
    />
  );
}
export function TBody(props: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className="divide-y divide-gray-100" {...props} />;
}
export function TR({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableRowElement>) {
  return <tr className={cn("hover:bg-gray-50/70", className)} {...props} />;
}
export function TH({
  className,
  ...props
}: React.ThHTMLAttributes<HTMLTableHeaderCellElement>) {
  return (
    <th
      className={cn("px-4 py-3 text-left font-semibold", className)}
      {...props}
    />
  );
}
export function TD({
  className,
  ...props
}: React.TdHTMLAttributes<HTMLTableDataCellElement>) {
  return <td className={cn("px-4 py-3 align-middle", className)} {...props} />;
}
