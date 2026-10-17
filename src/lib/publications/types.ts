export type TedasSpecItem = {
  id: string;
  code: string;
  title: string;
  url: string;
  note?: string;
  children?: TedasSpecItem[];
};

export type TedasCategory = {
  id: string;
  code: string;
  title: string;
  items: TedasSpecItem[];
};

export type EpdkTreeNode = {
  id: string;
  title: string;
  href?: string;
  isExternal?: boolean;
  items?: EpdkTreeNode[];
  subGroups?: EpdkTreeNode[];
};
