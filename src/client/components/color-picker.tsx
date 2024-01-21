"use client";

import { Popover, PopoverTrigger } from "@/client/components/ui/popover";

import { PopoverContent } from "@radix-ui/react-popover";
import {
  hslaToHsva,
  hsvaToHex,
  type ColorResult,
  type HslColor,
} from "@uiw/react-color";
import ChromeColorPicker from "@uiw/react-color-chrome";

export const ColorPicker = ({
  color,
  onColorChange,
}: {
  color: HslColor;
  onColorChange: (color: ColorResult) => void;
}) => {
  const hsva = hslaToHsva({
    ...color,
    a: 1,
  });

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className="size-6 flex-shrink-0 rounded border"
          style={{
            backgroundColor: hsvaToHex(hsva),
          }}
        ></button>
      </PopoverTrigger>
      <PopoverContent className="isolate z-50">
        <ChromeColorPicker color={hsva} onChange={onColorChange} />
      </PopoverContent>
    </Popover>
  );
};
