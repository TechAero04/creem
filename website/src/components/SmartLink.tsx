import Link from "next/link";
import type { ComponentProps } from "react";

const IS_STATIC = process.env.NEXT_PUBLIC_STATIC === "1";

export function SmartLink({ href, children, ...rest }: ComponentProps<typeof Link>) {
  if (IS_STATIC && typeof href === "string") {
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} {...rest}>
      {children}
    </Link>
  );
}
