import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDetectClickOutside } from 'react-detect-click-outside';
import { BiPlus } from 'react-icons/bi';
// import { useAuth } from 'src/providers/AuthProvider';
// import { ModalType, useModal } from 'src/providers/ModalProvider';
// import { useUser } from 'src/providers/UserProvider';
import { userPath, registerPath, signinPath } from 'src/utils/paths';
import { MenuToggle } from '../Menu';
import { Darkmode } from './Darkmode';
import { HeaderButton } from './HeaderButton';
import { HeaderItem } from './HeaderItem';
import { Notifications } from './Notifications';

export const NavRight = () => {
  // const { user } = useUser();
  const router = useRouter();
  // const { signOut } = useAuth();
  // const { openModal } = useModal();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const ref = useDetectClickOutside({
    onTriggered: () => isMenuOpen && setIsMenuOpen(false),
  });

  return (
    <div className="t.flex t.flex-row t.items-center">
      <Darkmode />
      <Notifications />
      <span className="t.visible lg:t.invisible lg:t.hidden" ref={ref}>
        <MenuToggle isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
      </span>

      {/* {!!user ? (
        <div className="t.hidden lg:t.flex lg:t.visible">
          <HeaderItem path={userPath(user.id)} label={`@${user.username}`} />
          <HeaderItem label="Logout" onClick={signOut} />
        </div>
      ) : (
        <div className="t.hidden lg:t.flex lg:t.visible">
          <HeaderItem path={registerPath} label="Register" />
          <HeaderItem path={signinPath} label="Login" />
        </div>
      )} */}

      {/* <HeaderButton
        className="t.ml-4 t.pr-4 t.hidden lg:t.flex lg:t.visible"
        onClick={() => {
          !!user ? openModal(ModalType.CREATEDECK) : router.push(signinPath);
        }}
      >
        <BiPlus size={20} className="t.mr-1.5 t.mt-[1px] t.inline-block" />
        New Deck
      </HeaderButton> */}
    </div>
  );
};
