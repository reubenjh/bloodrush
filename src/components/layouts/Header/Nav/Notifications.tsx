import {
  KnockFeedProvider,
  NotificationFeedPopover,
  UnseenBadge,
} from '@knocklabs/react-notification-feed';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { Tooltip } from 'src/components/atoms/Tooltip';
import { env } from 'src/env/client.mjs';
import { useTheme } from 'src/providers/ThemeProvider';
import { deckPath, homePath } from 'src/utils/paths';

export const Notifications = () => {
  const [isVisible, setIsVisible] = useState(false);

  const notifButtonRef = useRef(null);
  const { data: sessionData } = useSession();
  const router = useRouter();

  const { theme, isDark } = useTheme();
  if (!theme || !sessionData?.user) return null;

  return (
    <KnockFeedProvider
      colorMode={isDark ? 'dark' : 'light'}
      apiKey={env.NEXT_PUBLIC_KNOCK_PUBLIC_KEY}
      userToken={sessionData.user.notificationkey}
      feedId={'94360714-b0ae-4073-ba9a-5e953ccc914f'}
      userId={sessionData.user.id.toString()}
    >
      <span ref={notifButtonRef}>
        <Tooltip message="Notifications">
          <span className="px-1">
            <IoMdNotificationsOutline
              onClick={(e: any) => setIsVisible(!isVisible)}
              size={20}
              color={
                isDark || router.pathname === homePath
                  ? 'white'
                  : 'rgba(0,0,0,0.55)'
              }
            />
          </span>

          <UnseenBadge badgeCountType="unread" />
        </Tooltip>

        <NotificationFeedPopover
          buttonRef={notifButtonRef}
          isVisible={isVisible}
          onClose={() => {
            setIsVisible(false);
          }}
          onNotificationClick={(item) => {
            if (!!item.data?.deck_id) {
              router.push(deckPath(item.data.deck_id));
            }
            setIsVisible(false);
          }}
          closeOnClickOutside={true}
        />
      </span>
    </KnockFeedProvider>
  );
};
