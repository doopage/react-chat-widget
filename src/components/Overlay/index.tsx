export type Props = {
  zIndex?: number;
  onClick?: () => void;
}

function Overlay({ zIndex = 1_000, onClick }: Props) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: zIndex
      }}
      onClick={onClick}
    />
  );
}

export default Overlay;
