import { useRouter } from 'next/router';
import { BiPlus } from 'react-icons/bi';
// import { useAuth } from 'src/providers/AuthProvider';
// import { ModalType, useModal } from 'src/providers/ModalProvider';
// import { useUser } from 'src/providers/UserProvider';
import {
  cardsPath,
  decksPath,
  homePath,
  userPath,
  registerPath,
  signinPath,
} from 'src/utils/paths';
import { MenuItem } from './MenuItem';

export const Menu = ({ onClose }: { onClose: () => void }) => {
  // const { user } = useUser();
  const router = useRouter();
  // const { signOut } = useAuth();
  // const { openModal } = useModal();

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
    </div>
  );
};
