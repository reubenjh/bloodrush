import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { BiPlus } from 'react-icons/bi';
// import { ModalType, useModal } from 'src/providers/ModalProvider';
import { cardsPath, decksPath, homePath, userPath } from 'src/utils/paths';
import { MenuItem } from './MenuItem';

export const Menu = ({ onClose }: { onClose: () => void }) => {
  // const { user } = useUser();
  const router = useRouter();
  // const { signOut } = useAuth();
  // const { openModal } = useModal();
  const { data: sessionData } = useSession();

  return (
    <div
      className="t.absolute t.rounded-md t.bg-white t.z-20 t.origin-top-right t.w-48 t.py-1.5 t.right-1 
        t.shadow-lg t.ring-1 t.ring-black t.ring-opacity-5"
    >
      <div className="t.text-sm" role="menu">
        <MenuItem path={homePath} label="Home" />
        {/* <MenuItem path={decksPath} label="Decks" /> */}
        <MenuItem path={cardsPath} label="Cards" />
        {/* <MenuItem path={contentPath} label="Content" /> */}
      </div>

      {!!sessionData?.user ? (
        <>
          <MenuItem
            path={userPath(sessionData.user.id)}
            label={`@${sessionData.user.name}`}
          />
          <MenuItem label="Logout" onClick={signOut} />

          {/*  Note we can't use line component here as this menu isn't dark mode responsive */}
          <div className={`t.h-[1px] t.bg-line-color t.my-1.5`}></div>

          {/* <MenuItem
            label="New Deck"
            IconComponent={BiPlus}
            onClick={() => {
              if (!!user) {
                openModal(ModalType.CREATEDECK);
                onClose();
              } else {
                router.push(signinPath);
              }
            }}
          /> */}
        </>
      ) : (
        <>
          <MenuItem onClick={signIn} label="Login" />

          {/*  Note we can't use line component here as this menu isn't dark mode responsive */}
          <div className={`t.h-[1px] t.bg-line-color t.my-1.5`}></div>

          {/* <MenuItem
            label="New Deck"
            IconComponent={BiPlus}
            onClick={() => {
              !!user
                ? openModal(ModalType.CREATEDECK)
                : router.push(signinPath);
              onClose();
            }}
          /> */}
        </>
      )}
    </div>
  );
};
