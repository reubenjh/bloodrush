import { signIn, signOut, useSession } from 'next-auth/react';
import { BiPlus } from 'react-icons/bi';
import { ModalType, useModal } from 'src/providers/ModalProvider/ModalProvider';
import {
  cardsPath, // decksPath,
  homePath,
  userPath,
} from 'src/utils/paths';
import { MenuItem } from './MenuItem';

export const Menu = ({ onClose }: { onClose: () => void }) => {
  const { openModal } = useModal();
  const { data: sessionData } = useSession();

  return (
    <div
      className="absolute rounded-md bg-white z-20 origin-top-right w-48 py-1.5 right-1 
        shadow-lg ring-1 ring-black ring-opacity-5"
    >
      <div className="text-sm" role="menu">
        <MenuItem path={homePath} label="Home" />
        {/* <MenuItem path={decksPath} label="Decks" /> */}
        <MenuItem path={cardsPath} label="Cards" />
        {/* <MenuItem path={contentPath} label="Content" /> */}

        {!!sessionData?.user ? (
          <>
            <MenuItem
              path={userPath(sessionData.user.id)}
              label={`@${sessionData.user.name}`}
            />
            <MenuItem label="Logout" onClick={signOut} />

            {/*  Note we can't use line component here as this menu isn't dark mode responsive */}
            <div className={`h-[1px] bg-line-color my-1.5`}></div>

            <MenuItem
              label="New Deck"
              IconComponent={BiPlus}
              onClick={() => {
                if (!!sessionData.user) {
                  openModal(ModalType.CREATEDECK);
                  onClose();
                } else {
                  signIn();
                }
              }}
            />
          </>
        ) : (
          <>
            <MenuItem onClick={signIn} label="Login" />

            {/*  Note we can't use line component here as this menu isn't dark mode responsive */}
            <div className={`h-[1px] bg-line-color my-1.5`}></div>

            <MenuItem
              label="New Deck"
              IconComponent={BiPlus}
              onClick={() => {
                if (!!sessionData?.user) {
                  openModal(ModalType.CREATEDECK);
                  onClose();
                } else {
                  signIn();
                }
              }}
            />
          </>
        )}
      </div>
    </div>
  );
};
