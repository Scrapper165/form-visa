"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
export const CustomProgressBar = () => {
  return (
    <ProgressBar
      height="4px"
      color="#003eb9"
      options={{ showSpinner: false }}
      shallowRouting
    />
  );
};
