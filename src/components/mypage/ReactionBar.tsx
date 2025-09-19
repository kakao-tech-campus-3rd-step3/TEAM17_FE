import { ReactionBarContainer, Icon, Number, Wrapper } from '@/components/mypage/ReactionBar.style';

import heartIcon from '@/assets/icon-heart.svg';
import commentIcon from '@/assets/icon-message-circle.svg';
import bookMark from '@/assets/icon-bookmark.svg';

const reactions = [
  { icon: heartIcon, alt: '하트아이콘', count: 11 },
  { icon: commentIcon, alt: '댓글아이콘', count: 4 },
  { icon: bookMark, alt: '저장아이콘', count: 2 },
];

const ReactionBar = () => {
  return (
    <>
      <ReactionBarContainer>
        {reactions.map(({ icon, alt, count }, idx) => (
          <Wrapper key={idx}>
            <Icon src={icon} alt={alt} />
            <Number>{count}</Number>
          </Wrapper>
        ))}
      </ReactionBarContainer>
    </>
  );
};

export default ReactionBar;
