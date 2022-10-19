import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDetectClickOutside } from 'react-detect-click-outside';
// import { BiPlus } from 'react-icons/bi';
import { useModal } from 'src/providers/ModalProvider';
import { userPath } from 'src/utils/paths';
import { MenuToggle } from '../Menu';
import { Darkmode } from './Darkmode';
// import { HeaderButton } from './HeaderButton';
import { HeaderItem } from './HeaderItem';
import { Notifications } from './Notifications';

export const NavRight = () => {
  // const router = useRouter();
  const { data: sessionData } = useSession();

  // const { openModal } = useModal();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const ref = useDetectClickOutside({
    onTriggered: () => isMenuOpen && setIsMenuOpen(false),
  });

  return (
    <div className="flex flex-row items-center">
      <Darkmode />
      <Notifications />
      <span className="visible lg:invisible lg:hidden" ref={ref}>
        <MenuToggle isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
      </span>

      {!!sessionData?.user ? (
        <div className="hidden lg:flex lg:visible">
          <HeaderItem
            path={userPath(sessionData.user.id)}
            label={
              sessionData.user.name ? `@${sessionData.user.name}` : 'Account'
            }
          />
          <HeaderItem label="Logout" onClick={signOut} />
        </div>
      ) : (
        <div className="hidden lg:flex lg:visible">
          <HeaderItem label="Login" onClick={signIn} />
        </div>
      )}

      {/* <HeaderButton
        className="ml-4 pr-4 hidden lg:flex lg:visible"
        onClick={() => {
          !!user ? openModal(ModalType.CREATEDECK) : router.push(signinPath);
        }}
      >
        <BiPlus size={20} className="mr-1.5 mt-[1px] inline-block" />
        New Deck
      </HeaderButton> */}
    </div>
  );
};
