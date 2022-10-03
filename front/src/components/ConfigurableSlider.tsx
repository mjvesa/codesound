import { Slider, Stack, TextField } from "@mui/material";

interface ConfigurableSliderProps {
  name: string;
  from: number;
  to: number;
  value: number;
}

export const ConfigurableSlider = ({
  name,
  from,
  to,
  value,
}: ConfigurableSliderProps) => {
  return (
    <Stack direction={"row"}>
      <TextField value={from}></TextField>
      <Slider value={value} orientation="vertical"></Slider>
      <TextField value={to}></TextField>
    </Stack>
  );
};
