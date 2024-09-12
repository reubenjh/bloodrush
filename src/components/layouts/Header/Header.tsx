import { NavLeft, NavRight } from './Nav';

export const Header = () => {
  return (
    <header>
      <nav className="container m-auto flex flex-row justify-between py-4 items-center px-4">
        <NavLeft />
        <NavRight />
      </nav>
    </header>
  );
};
