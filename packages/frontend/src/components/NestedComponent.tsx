import * as React from 'react';
import Image from 'next/image';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
import styled from 'styled-components';
import { ButtonIcon } from './ButtonIcon';
import { IPostWithReplies } from '@/types/api';

interface INestedComponentProps {
  depth: number;
  commentId: string;
  title: string;
  message: string;
  createdAt: Date;
  tagName: string;
  innerComments: React.ReactNode;
  profileImgURL: string;
  proof: string;
  childrenLength: number;
}

export const resolveNestedComponentThreads = (allComments: IPostWithReplies[], depth: number) => {
  const commentNodes: React.ReactNode[] = [];
  const tagName = 'JohnDoe';
  const profileImgURL = '';
  const proof = '';
  for (const comment of allComments) {
    commentNodes.push(
      <NestedComponent
        key={comment.id}
        depth={depth}
        commentId={comment.id}
        title={comment.title}
        message={comment.body}
        createdAt={new Date(comment.timestamp)}
        tagName={tagName}
        innerComments={resolveNestedComponentThreads(comment.replies, depth + 1)}
        profileImgURL={profileImgURL}
        proof={proof}
        childrenLength={comment.replies.length}
      />,
    );
  }
  return commentNodes;
};

const Container = styled.div``;

export const NestedComponent = ({
  depth,
  commentId,
  title,
  message,
  createdAt,
  tagName,
  innerComments,
  profileImgURL,
  proof,
  childrenLength,
}: INestedComponentProps) => {
  const dateFromDescription = React.useMemo(() => {
    const date = dayjs(createdAt);
    // Dayjs doesn't have typings on relative packages so we have to do this
    // @ts-ignore
    return date.fromNow();
  }, [createdAt]);

  return (
    <Container
      key={commentId}
      style={{
        marginLeft: `${depth * 20}px`,
        borderLeft: '0.5px dotted grey',
        paddingLeft: '10px',
      }}
    >
      <div className="py-2"></div>
      <div className="flex justify-between items-center">
        <div className="flex justify-center items-center">
          <Image
            alt={'profile'}
            src={profileImgURL ? profileImgURL : '/anon-noun.png'}
            width={30}
            height={30}
          />
          <div className="px-0.5"></div>
          <p className="font-bold">{tagName}</p>
          <div className="px-2"></div>
          <p style={{ color: 'gray' }}>{dateFromDescription}</p>
        </div>
      </div>
      <div className="py-2"></div>
      <span>{message}</span>
      <div className="py-2"></div>
      <div className="w-full" style={{ height: '2px', background: '#EAECF0' }}></div>
      <div className="py-1"></div>
      <div className="flex justify-between items-center">
        {/* // TODO fetch this info */}
        <div className="flex justify-center items-center">
          <ButtonIcon
            onClick={() => console.log('clicked')}
            iconPath="/upvote.svg"
            bgColor="#D0D5DD"
            hoverBgColor="#0E76FD"
            iconWidth={20}
            iconHeight={20}
            iconText="50"
          />
          <div className="px-1"></div>
          <ButtonIcon
            onClick={() => console.log('clicked')}
            iconPath="/downvote.svg"
            hoverBgColor="#0E76FD"
            bgColor="#D0D5DD"
            iconWidth={20}
            iconHeight={20}
            iconText=""
          />
        </div>
        <div className="flex justif-center items-center">
          <strong style={{ color: '#47546' }}>{childrenLength}</strong>
          <div className="px-0.5"></div>
          <p style={{ color: 'gray' }}>{'  '}replies</p>
          <div className="px-4"></div>
          <ButtonIcon
            onClick={() => console.log('clicked')}
            iconPath="/reply.svg"
            bgColor="#D0D5DD"
            hoverBgColor="#0E76FD"
            iconWidth={15}
            iconHeight={12.5}
            iconText={'Reply'}
          />
        </div>
      </div>
      <div className="py-2"></div>
      {innerComments}
    </Container>
  );
};
