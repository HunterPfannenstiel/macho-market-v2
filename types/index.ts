export type ModalProps = {
  showModal: boolean;
  playAnimation: boolean;
  toggle: () => void;
  animationTime?: number;
};

export type Selections = {
  [id: number]: boolean;
};

export type PageFetch = {
  date: string | Date;
  page: number;
  pageSize: number;
};
