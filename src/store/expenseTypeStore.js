import { create } from "zustand";

const useSplitType = create((set) => ({
  splitType: ["EQUAL", "EXACT", "PERCENT"],
}));

export default useSplitType;
