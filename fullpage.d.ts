declare module "react-fullpage" {
  import * as React from "react";

  export const Fullpage: React.FC<{children: React.ReactNode}>;
  export const FullPageSections: React.FC<{children: React.ReactNode}>;
  export const FullpageSection: React.FC<{children: React.ReactNode; style?: React.CSSProperties}>;
  export const FullPageNavigation: React.FC<{children?: React.ReactNode}>;
}
