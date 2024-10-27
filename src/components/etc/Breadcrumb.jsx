"use client";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";

export function BreadcrumbSection() {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter((segment) => segment);

  const breadcrumbItems = pathSegments.map((segment, index) => {
    const href = "/" + pathSegments.slice(0, index + 1).join("/");
    return {
      label:
        segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " "),
      href,
    };
  });

  return (
    <Breadcrumb className=" p-4 rounded-lg ">
      <BreadcrumbList className="flex items-center space-x-2 text-sm text-gray-600">
        <BreadcrumbItem className="flex items-center">
          <BreadcrumbLink
            href="/"
            className="text-blue-500 hover:text-blue-700 font-medium transition-colors"
          >
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        {breadcrumbItems.length > 0 && (
          <BreadcrumbSeparator className="text-gray-400" />
        )}
        {breadcrumbItems.map((item, index) => (
          <React.Fragment key={index}>
            {index > 0 && <BreadcrumbSeparator className="text-gray-400" />}
            <BreadcrumbItem className="flex items-center">
              {index === breadcrumbItems.length - 1 ? (
                <BreadcrumbPage className="text-gray-900 font-semibold">
                  {item.label}
                </BreadcrumbPage>
              ) : (
                <BreadcrumbLink
                  href={item.href}
                  className="text-blue-500 hover:text-blue-700 font-medium transition-colors"
                >
                  {item.label}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
