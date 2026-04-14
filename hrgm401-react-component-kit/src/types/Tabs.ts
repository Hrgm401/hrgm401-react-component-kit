import type { ReactNode } from "react";

export type TabVariant = "default" | "pill" | "line";

export type TabOption = {
    label?: ReactNode;
    value: string;
    icon?: ReactNode;
};
