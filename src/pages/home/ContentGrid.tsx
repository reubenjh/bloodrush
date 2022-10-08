import { InternalLink } from 'src/components/atoms/Link/InternalLink';
import { ContentPreviewList } from 'src/components/molecules/ContentPreviewList';
import { ContentType } from 'src/types/content';
import { contentPath } from 'src/utils/paths';

export const ContentGrid = ({ content }: { content: ContentType[] }) => {
  return (
    <div className="t.mb-16">
      <div className="t.mb-8">
        <div className={`t.font-title t.font-semibold t.text-xl t.text-center`}>
          <span className="t.pr-4">LATEST CONTENT</span>
          <InternalLink
            className={`t.pl-4 t.border-l t.border-l-black dark:t.border-l-white`}
            href={contentPath}
            color="primary"
          >
            See all
          </InternalLink>
        </div>
      </div>
      <ContentPreviewList content={content}></ContentPreviewList>
    </div>
  );
};
