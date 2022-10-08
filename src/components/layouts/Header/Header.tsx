import { NavLeft, NavRight } from './Nav';

export const Header = () => {
  return (
    <header>
      <nav className="t.container t.m-auto t.flex t.flex-row t.justify-between t.py-4 t.items-center t.px-4">
        <NavLeft />
        <NavRight />
      </nav>
    </header>
  );
};
