export interface TdImageViewerProps {
  images: string[];
  visible?: boolean;
  showIndex?: boolean;
  initialIndex?: number;
  backgroundColor?: string;
  onClose?: () => void;
}
