export type timestamp = number;

export type AppRecord = {
  loading: boolean;
  authorized: boolean;
  lastRoute?: {
    path: string;
    activeUntil: timestamp;
  };
};
