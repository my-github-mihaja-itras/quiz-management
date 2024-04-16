export interface ColorClass {
  bgcolor: string;
  color: string;
}
export function getColorClass(groupName: string): ColorClass {
  switch (groupName) {
    case "ADMIN":
      return { bgcolor: "#FFD1D9", color: "#D35151" };
    case "ADM":
      return { bgcolor: "#FFD1D9", color: "#D35151" };
    case "ETU":
      return { bgcolor: "#FFECD1", color: "#FFA319" };
    case "PED":
      return { bgcolor: "#E4EBFD", color: "#4042E2" };
    case "ENS":
      return { bgcolor: "#E4EBFD", color: "#4042E2" };
    case "TEC":
      return { bgcolor: "#D6F2FF", color: "#0FC3ED" };
    case "VIS":
      return { bgcolor: "#FFFFFF", color: "#0231A8" };
    default:
      return { bgcolor: "#EEEEEE", color: "#595959" };
  }
}

export const generateColors = (startColor: any, endColor: any, steps: any) => {
  const startRGB = hexToRGB(startColor);
  const endRGB = hexToRGB(endColor);
  const colors = [];

  for (let i = 0; i < steps; i++) {
    const factor = i / (steps - 1);
    const interpolatedColor = interpolateColor(startRGB, endRGB, factor);
    colors.push(interpolatedColor);
  }

  return colors;
};

const interpolateColor = (color1: any, color2: any, factor: number) => {
  const result = color1.map((channel: any, index: number) =>
    Math.round(channel + factor * (color2[index] - channel))
  );
  return `rgb(${result.join(",")})`;
};

const hexToRGB = (hex: any) => {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(
    shorthandRegex,
    (m: any, r: any, g: any, b: any) => r + r + g + g + b + b
  );
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
      ]
    : null;
};
export const addOpacityToColor = (
  hexColor: string,
  opacity: number
): string => {
  const hexToRgb = (hex: string): [number, number, number] => {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return [r, g, b];
  };

  const [r, g, b] = hexToRgb(hexColor);
  const rgbaColor = `rgba(${r}, ${g}, ${b}, ${opacity})`;

  return rgbaColor;
};

export const getRandomColor = (semesterIndex: number) => {
  switch (semesterIndex) {
    case 1:
      return { bgcolor: "#D6F2FF", color: "#0FC3ED" };
    case 2:
      return { bgcolor: "#FFECD1", color: "#FFA319" };
    case 3:
      return { bgcolor: "#8bdaff", color: "#ffffff" };
    case 4:
      return { bgcolor: "#E4EBFD", color: "#4042E2" };
    case 5:
      return { bgcolor: "#F4DF4EFF", color: "#949398FF" };
    case 6:
      return { bgcolor: "#949398FF", color: "#F4DF4EFF" };
    case 7:
      return { bgcolor: "#FC766AFF", color: "#5B84B1FF" };
    case 8:
      return { bgcolor: "#5B84B1FF", color: "#FC766AFF" };
    case 9:
      return { bgcolor: "#ADEFD1FF", color: "#00203FFF" };
    case 10:
      return { bgcolor: "#00203FFF", color: "#ADEFD1FF" };
    default:
      return { bgcolor: "#EEEEEE", color: "#595959" };
  }
};

export const getGradientColor = (index: number, length: any) => {
  const colors = [...generateColors("#4042E2", "#7D97F4", length)];
  return colors[index];
};
