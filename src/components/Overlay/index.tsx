export type Props = {
  zIndex?: number;
  onClick?: () => void;
  backgroundColor?: string;
  opacity?: number;
}

function Overlay({ zIndex = 1_000, backgroundColor, opacity, onClick }: Props) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: zIndex,
        backgroundColor: backgroundColor ?? '#000',
        opacity: opacity ?? 0.15
      }}
      onClick={onClick}
    />
  );
}

export default Overlay;
