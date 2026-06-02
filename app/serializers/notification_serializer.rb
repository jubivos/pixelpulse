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
        content: n.notifiable.content
      }
    when Review
      {
        type: "Review",
        id: n.notifiable.id,
        content: n.notifiable.content
      }
    when News
      {
        type: "News",
        id: n.notifiable.id,
        title: n.notifiable.title
      }
    else
      {
        type: n.notifiable_type,
        id: n.notifiable_id
      }
    end
  end
end