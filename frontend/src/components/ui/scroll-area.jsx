import React from "react";

export function ScrollArea({ children, className = "" }) {
  return (
    <div
      className={`overflow-y-auto overflow-x-hidden max-h-screen ${className}`}
      style={{ scrollbarWidth: "thin" }}
    >
      {children}
    </div>
  );
}
