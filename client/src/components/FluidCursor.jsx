"use client";
import { useEffect } from "react";
import fluidCursor from "../hooks/useFluidCursor";

const FluidCursor = () => {
  useEffect(() => {
    fluidCursor();
  }, []);

  return (
    <div
      className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
      style={{ inset: 0 }}
    >
      <canvas id="fluid" className="w-full h-full" />
    </div>
  );
};

export default FluidCursor;
