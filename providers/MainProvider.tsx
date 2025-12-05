"use client";
import { UIKitProvider } from "@tencentcloud/uikit-base-component-react";

export default function MainProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <UIKitProvider language="en-US">{children}</UIKitProvider>;
}
