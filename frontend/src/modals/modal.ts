export interface ILink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface IMeta {
  current_page: number;
  to: number;
  total: number;
  from: number;
  per_page: number;
  last_page: number;
  links: ILink[];
}
