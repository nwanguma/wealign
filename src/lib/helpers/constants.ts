export interface DateInfo {
  dayOfWeek: string;
  day: string;
  month: string;
}

export enum FormatDateOptionsEnum {
  LONG = "long",
  SHORT = "short",
}

export interface FormatDateOptions {
  monthType: FormatDateOptionsEnum;
  weekdayType: FormatDateOptionsEnum;
}
