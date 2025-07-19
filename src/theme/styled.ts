import { cn } from "../lib/utils";

export interface StyledProps {
  className?: string;
  color?: string;
  bg?: string;
  p?: string;
  m?: string;
  px?: string;
  py?: string;
  mx?: string;
  my?: string;
  rounded?: string;
  shadow?: string;
}

export function styled(baseClasses: string = "") {
  return (props: StyledProps) => {
    const classes = [baseClasses];

    // Color utilities
    if (props.color) {
      classes.push(`text-${props.color}`);
    }
    if (props.bg) {
      classes.push(`bg-${props.bg}`);
    }

    // Spacing utilities
    if (props.p) classes.push(`p-${props.p}`);
    if (props.m) classes.push(`m-${props.m}`);
    if (props.px) classes.push(`px-${props.px}`);
    if (props.py) classes.push(`py-${props.py}`);
    if (props.mx) classes.push(`mx-${props.mx}`);
    if (props.my) classes.push(`my-${props.my}`);

    // Border radius
    if (props.rounded) classes.push(`rounded-${props.rounded}`);

    // Shadow
    if (props.shadow) classes.push(`shadow-${props.shadow}`);

    return cn(...classes, props.className);
  };
}
