interface HeaderProps {
  left: JSX.Element;
  center?: JSX.Element;
  right?: JSX.Element;
  className?: string;
}

const Header = ({ left, center, right, className }: HeaderProps) => {
  return (
    <header
      className={`flex justify-between items-center px-1.5 my-2 gap-4 ${className}`}
    >
      <div>{left}</div>
      {center && <div className="grow">{center}</div>}
      {right && (
        <div className="flex items-center justify-center px-3">{right}</div>
      )}
    </header>
  );
};

export default Header;
