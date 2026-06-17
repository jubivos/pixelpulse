class CommentSerializer
  def initialize(comments)
    @comments = comments
  end

  def as_json
    if @comments.is_a?(Enumerable)
      @comments.map { |comment| serialize_comment(comment) }
    else
      serialize_comment(@comments)
    end
  end

  private

  def serialize_comment(comment)
    {
      id: comment.id,
      content: comment.content,
      created_at: comment.created_at,

      user: {
        id: comment.user.id,
        nickname: comment.user.nickname
      },

      replies: serialize_replies(comment.replies)
    }
  end

  def serialize_replies(replies)
    return [] if replies.empty?

    replies.map { |reply| serialize_comment(reply) }
  end
end