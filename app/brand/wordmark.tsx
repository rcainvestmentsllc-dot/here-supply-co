import styles from "./wordmark.module.css";

type Size = "sm" | "md" | "lg" | "xl";

/** The original Here Supply Co. wave mark is the primary brand mark. */
export function Wordmark({
  size = "md",
  onDark = false,
  stacked = false,
  as = "span",
}: {
  size?: Size;
  onDark?: boolean;
  stacked?: boolean;
  sub?: string;
  showSub?: boolean;
  as?: "span" | "div";
}) {
  const Tag = as;
  const classes = [styles.wordmark, styles[size]];
  if (onDark) classes.push(styles.onDark);
  if (stacked) classes.push(styles.stacked);
  const asset = onDark
    ? "/assets/brand/here-supply-co-logo-inverse-v2.svg"
    : "/assets/brand/here-supply-co-logo-v2.svg";

  return (
    <Tag className={classes.join(" ")}>
      <img src={asset} width="1874" height="547" alt="Here Supply Co." />
    </Tag>
  );
}
