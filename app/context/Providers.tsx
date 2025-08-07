import { ReactNode } from "react";
import { ProjectNameProvider } from "./ProjectNameContext";

export const Providers = ({ children }: { children: ReactNode }) => (
    <ProjectNameProvider>
        {children}
    </ProjectNameProvider>
);