class NotificationSerializer
  def initialize(notifications)
    @notifications = notifications
  end

  def as_json
    @notifications.map { |n| serialize(n) }
  end

  private

  def serialize(n)
    {
      id: n.id,
      action: n.action,
      read: n.read,
      created_at: n.created_at,

      actor: {
        id: n.actor.id,
        nickname: n.actor.nickname
      },

      notifiable: serialize_notifiable(n)
    }
  end

  def serialize_notifiable(n)
    case n.notifiable
    when Comment
      {
        type: "Comment",
        id: n.notifiable.id,
        content: n.notifiable.content,
        url: comment_url(n.notifiable)
      }
    when Review
      {
        type: "Review",
        id: n.notifiable.id,
        content: n.notifiable.content,
        url: "/games/#{n.notifiable.game_id}"
      }
    when News
      {
        type: "News",
        id: n.notifiable.id,
        title: n.notifiable.title,
        url: "/news/#{n.notifiable.id}"
      }
    else
      {
        type: n.notifiable_type,
        id: n.notifiable_id,
        url: "#"
      }
    end
  end

  def comment_url(comment)
    case comment.commentable
    when News
      "/news/#{comment.commentable.id}"
    when Review
      "/games/#{comment.commentable.game_id}"
    else
      "#"
    end
  end
end