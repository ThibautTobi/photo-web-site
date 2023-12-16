// "use client";

import LinearProgress from "@mui/material/LinearProgress";

export default function Loading () {
  return (
    <div className="flex items-center justify-center h-full">
      <LinearProgress className="w-32 md:w-52" color="secondary" />
    </div>
  );
};