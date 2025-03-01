import dayjs from 'dayjs';
import * as React from 'react';
import { MessageModal } from './MessageModal';
import { IRootPost } from '@/types/api';
const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

type ICommentViewProps = IRootPost & {
  tagName: string;
  shouldOpenModal?: boolean;
};

export const CommentView = ({
  title,
  body,
  timestamp,
  tagName,
  id,
  replyCount,
  shouldOpenModal,
}: ICommentViewProps) => {
  const [isOpen, setIsOpen] = React.useState(shouldOpenModal || false);
  // TODO: after we add wagmi
  //  const { address } = useAccount();

  const openModal = () => {
    setIsOpen(true);
  };

  // TODO figure out how to pass in the comments
  const dateFromDescription = React.useMemo(() => {
    const date = dayjs(timestamp);
    // Dayjs doesn't have typings on relative packages so we have to do this
    // @ts-ignore
    return date.fromNow();
  }, [timestamp]);

  return (
    <>
      <MessageModal
        title={title}
        tagName={tagName}
        dateFromDescription={dateFromDescription}
        message={body}
        commentId={id}
        isOpen={isOpen}
        replyCount={replyCount}
        handleClose={(e) => {
          setIsOpen(false);
        }}
      />
      <div
        onClick={openModal}
        className="rounded-2xl transition-all shadow-sm bg-white p-3 md:px-5 md:py-4 flex flex-col gap-4 justify-between border border-gray-200 hover:border-gray-300 hover:cursor-pointer w-full"
      >
        <div className="text-lg md:text-xl font-bold self-start line-clamp-2">
          <span className="text-black tracking-tight font-bold">{body}</span>
        </div>
        <span>{body}</span>
        <div className="flex justify-between items-center">
          <div className="flex justify-center items-center">
            <p className="font-bold">{tagName}</p>
            <div className="px-2"></div>
            <p style={{ color: 'gray' }}>{dateFromDescription}</p>
          </div>
          <div className="flex justify-between items-center">
            <p style={{ color: 'gray' }}>{replyCount} replies</p>
            <div className="px-2"></div>
          </div>
        </div>
      </div>
    </>
  );
};
