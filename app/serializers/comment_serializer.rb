class CommentSerializer
  def initialize(comments)
    @comments = comments
  end

  def as_json
    @comments.map { |comment| serialize(comment) }
  end

  private

  def serialize(comment)
    {
      id: comment.id,
      content: comment.content,

      user: {
        id: comment.user.id,
        nickname: comment.user.nickname
      },

      created_at: comment.created_at,

      replies: comment.replies.map { |reply| serialize(reply) }
    }
  end
end