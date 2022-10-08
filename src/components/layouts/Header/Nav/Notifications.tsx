// import {
//   KnockFeedProvider,
//   NotificationFeedPopover,
//   UnseenBadge,
// } from '@knocklabs/react-notification-feed';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { Tooltip } from 'src/components/atoms/Tooltip';
import { env } from 'src/env/client.mjs';
// import { useTheme } from 'src/providers/ThemeProvider';
// import { useUser } from 'src/providers/UserProvider';
import { homePath } from 'src/utils/paths';

export const Notifications = () => {
  const [isVisible, setIsVisible] = useState(false);

  const notifButtonRef = useRef(null);
  // const { user } = useUser();
  const router = useRouter();

  // const { theme, isDark } = useTheme();
  // if (!theme || !user) return null;

  return (
    // <KnockFeedProvider
    //   colorMode={isDark ? 'dark' : 'light'}
    //   apiKey={env.NEXT_PUBLIC_KNOCK_PUBLIC_KEY}
    //   userToken={user.knock_jwt}
    //   feedId={'f090d8c8-6818-4e3d-b73d-4e7d9abfe2da'}
    //   userId={user!.id.toString()}
    // >
    <span ref={notifButtonRef}>
      <Tooltip message="Notifications">
        <span className="t.px-1">
          <IoMdNotificationsOutline
            onClick={(e: any) => setIsVisible(!isVisible)}
            size={20}
            color={
              // isDark || router.pathname === homePath
              //   ? 'white'
              //   : 'rgba(0,0,0,0.55)'
              'white'
            }
          />
        </span>

        {/* <UnseenBadge badgeCountType="unread" /> */}
      </Tooltip>

      {/* <NotificationFeedPopover
          buttonRef={notifButtonRef}
          isVisible={isVisible}
          onClose={() => {
            setIsVisible(false);
          }}
          onNotificationClick={(item) => {
            if (!!item.data?.deck_id) {
              router.push(`/decks/${item.data.deck_id}?tab=comments`);
            }
            setIsVisible(false);
          }}
          closeOnClickOutside={true}
        /> */}
    </span>
    // </KnockFeedProvider>
  );
};
