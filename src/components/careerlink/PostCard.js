import React, { useState } from 'react';
import Link from 'next/link';
import { 
  FaThumbsUp, 
  FaComment, 
  FaShare, 
  FaEllipsisH,
  FaHeart,
  FaLightbulb,
  FaAward
} from 'react-icons/fa';
import careerLinkDataUtils from '../../utils/careerLinkData';

const PostCard = ({ post, onLike, onComment, onShare, isCommented = false, isShared = false }) => {
  const [showFullContent, setShowFullContent] = useState(false);
  const [showReactions, setShowReactions] = useState(false);
  
  const { formatDate } = careerLinkDataUtils;

  const contentPreview = post.content.length > 200 
    ? post.content.substring(0, 200) + '...'
    : post.content;

  const reactions = [
    { type: 'like', icon: FaThumbsUp, color: 'text-blue-600', bgColor: 'bg-blue-100' },
    { type: 'celebrate', icon: FaAward, color: 'text-green-600', bgColor: 'bg-green-100' },
    { type: 'love', icon: FaHeart, color: 'text-red-600', bgColor: 'bg-red-100' },
    { type: 'insightful', icon: FaLightbulb, color: 'text-yellow-600', bgColor: 'bg-yellow-100' }
  ];

  const handleReaction = (type) => {
    if (onLike) onLike(post.id, type);
    setShowReactions(false);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 mb-4">
      {/* Post Header */}
      <div className="p-4 pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <Link href={`/careerlink/profile/${post.author}`}>
              <img
                src={post.authorPicture}
                alt={post.authorName}
                className="w-12 h-12 rounded-full cursor-pointer hover:opacity-90"
              />
            </Link>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <Link href={`/careerlink/profile/${post.author}`}>
                  <h3 className="text-sm font-semibold text-gray-900 hover:text-blue-600 cursor-pointer">
                    {post.authorName}
                  </h3>
                </Link>
                {/* Connection degree indicator */}
                <span className="text-xs text-gray-500">• 1st</span>
              </div>
              <p className="text-xs text-gray-600 mb-1">{post.authorHeadline}</p>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-500">{formatDate(post.timestamp)}</span>
                <span className="text-xs text-gray-500">•</span>
                <div className="w-3 h-3 text-gray-400">🌐</div>
              </div>
            </div>
          </div>
          
          <button className="text-gray-400 hover:text-gray-600 p-1">
            <FaEllipsisH size={14} />
          </button>
        </div>
      </div>

      {/* Post Content */}
      <div className="px-4 pb-3">
        <div className="text-sm text-gray-900">
          {showFullContent || post.content.length <= 200 ? (
            <span>{post.content}</span>
          ) : (
            <span>{contentPreview}</span>
          )}
          {post.content.length > 200 && (
            <button
              onClick={() => setShowFullContent(!showFullContent)}
              className="text-blue-600 hover:text-blue-800 ml-1 font-medium"
            >
              {showFullContent ? '...see less' : 'see more'}
            </button>
          )}
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="text-xs text-blue-600 hover:text-blue-800 cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Post Image */}
      {post.image && (
        <div className="px-4 pb-3">
          <img
            src={post.image}
            alt="Post content"
            className="w-full rounded-lg max-h-96 object-cover"
          />
        </div>
      )}

      {/* Engagement Stats */}
      {(post.likes > 0 || post.comments > 0) && (
        <div className="px-4 py-2 border-t border-gray-100">
          <div className="flex items-center justify-between text-xs text-gray-600">
            <div className="flex items-center space-x-2">
              {post.engagement.reactions && post.engagement.reactions.length > 0 && (
                <div className="flex items-center space-x-1">
                  <div className="flex -space-x-1">
                    {post.engagement.reactions.slice(0, 3).map((reaction, index) => {
                      const reactionType = reactions.find(r => r.type === reaction.type);
                      if (!reactionType) return null;
                      
                      const IconComponent = reactionType.icon;
                      return (
                        <div
                          key={index}
                          className={`w-5 h-5 rounded-full ${reactionType.bgColor} flex items-center justify-center border border-white`}
                        >
                          <IconComponent className={`text-xs ${reactionType.color}`} />
                        </div>
                      );
                    })}
                  </div>
                  <span>{post.likes}</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-4">
              {post.comments > 0 && (
                <span>{post.comments} comments</span>
              )}
              {post.shares > 0 && (
                <span>{post.shares} shares</span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="px-4 py-2 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            {/* Like Button with Reactions */}
            <div className="relative">
              <button
                onMouseEnter={() => setShowReactions(true)}
                onMouseLeave={() => setShowReactions(false)}
                onClick={() => handleReaction('like')}
                className={`
                  flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors
                  ${post.isLiked 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-600 hover:bg-gray-50'
                  }
                `}
              >
                <FaThumbsUp size={14} />
                <span>Like</span>
              </button>

              {/* Reactions Popup */}
              {showReactions && (
                <div 
                  className="absolute bottom-full left-0 mb-2 flex items-center space-x-1 bg-white border border-gray-200 rounded-full px-2 py-1 shadow-lg z-10"
                  onMouseEnter={() => setShowReactions(true)}
                  onMouseLeave={() => setShowReactions(false)}
                >
                  {reactions.map((reaction) => {
                    const IconComponent = reaction.icon;
                    return (
                      <button
                        key={reaction.type}
                        onClick={() => handleReaction(reaction.type)}
                        className={`
                          w-8 h-8 rounded-full ${reaction.bgColor} flex items-center justify-center
                          hover:scale-110 transition-transform
                        `}
                      >
                        <IconComponent className={`text-sm ${reaction.color}`} />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <button
              onClick={() => onComment && onComment(post.id)}
              className={`
                flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors
                ${isCommented 
                  ? 'text-green-600 bg-green-50' 
                  : 'text-gray-600 hover:bg-gray-50'
                }
              `}
            >
              <FaComment size={14} />
              <span>{isCommented ? 'Commented' : 'Comment'}</span>
            </button>

            <button
              onClick={() => onShare && onShare(post.id)}
              className={`
                flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors
                ${isShared 
                  ? 'text-purple-600 bg-purple-50' 
                  : 'text-gray-600 hover:bg-gray-50'
                }
              `}
            >
              <FaShare size={14} />
              <span>{isShared ? 'Shared' : 'Share'}</span>
            </button>
          </div>

          <button
            onClick={() => onShare && onShare(post.id)}
            className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <FaShare size={14} />
            <span>Send</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
