import styles from "./wordmark.module.css";

type Size = "sm" | "md" | "lg" | "xl";

export function Wordmark({
  size = "md",
  onDark = false,
  stacked = false,
  sub = "Made in North Carolina",
  showSub = true,
  as = "span",
}: {
  size?: Size;
  onDark?: boolean;
  stacked?: boolean;
  /** The provenance line under the rule. Pass null-ish via showSub to omit. */
  sub?: string;
  showSub?: boolean;
  as?: "span" | "div";
}) {
  const Tag = as;
  const classes = [styles.wordmark, styles[size]];
  if (onDark) classes.push(styles.onDark);
  if (stacked) classes.push(styles.stacked);

  return (
    <Tag className={classes.join(" ")}>
      <span className={styles.name}>Here Supply Co.</span>
      {showSub && (
        <span className={styles.rule}>
          <i />
          <span>{sub}</span>
        </span>
      )}
    </Tag>
  );
}
