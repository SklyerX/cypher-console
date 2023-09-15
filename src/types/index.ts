export type AppProps = {
  id: string;
  createdAt: string;
  name: string;
  totalEvents: Array<DaysOfTheWeek>;
};

export type DaysOfTheWeek = {
  name: string;
  events: number;
};
