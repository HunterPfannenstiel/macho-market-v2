export type ModalProps = {
  showModal: boolean;
  playAnimation: boolean;
  toggle: () => void;
  animationTime?: number;
};

export type Selections = {
  [id: number]: boolean;
};
