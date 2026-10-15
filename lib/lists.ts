/**
 * The two free email lists. Each is a MailerLite embedded form (no API key
 * needed) that drops the address into its own group and starts its own short
 * series. The couples list and the men's list never share a series.
 */
export const LISTS = {
  /** Sunday Board guide: group "Here Supply Co. | Sunday Board". */
  couples: "https://assets.mailerlite.com/jsonp/2381566/forms/196874718498785144/subscribe",
  /** Driveway Card: group "Here Supply Co. | Men's Free List", automation "Men's Driveway Card Series". */
  men: "https://assets.mailerlite.com/jsonp/2381566/forms/201403717961909606/subscribe",
} as const;

export type ListKey = keyof typeof LISTS;

export const listFor = (value: unknown): ListKey => (value === "men" ? "men" : "couples");
