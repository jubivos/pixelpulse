class ActivitySerializer
  def initialize(activities)
    @activities = activities
  end

  def as_json
    @activities.map { |a| serialize_activity(a) }
  end

  private

  def serialize_activity(activity)
    {
      id: activity.id,
      action_type: activity.action,
      created_at: activity.created_at,

      user: {
        id: activity.user.id,
        nickname: activity.user.nickname
      },

      target: serialize_target(activity)
    }
  end

  def serialize_target(activity)
    case activity.target
    when Review
      {
        type: "Review",
        id: activity.target.id,
        content: activity.target.content,
        game_id: activity.target.game_id,
        title: activity.target.game.title,
        url: "/games/#{activity.target.game_id}"
      }
    when News
      {
        type: "News",
        id: activity.target.id,
        title: activity.target.title,
        url: "/news/#{activity.target.id}"
      }
    when Comment
      {
        type: "Comment",
        id: activity.target.id,
        content: activity.target.content,
        url: comment_url(activity.target)
      }
    when Game
      {
        type: "Game",
        id: activity.target.id,
        title: activity.target.title,
        url: "/games/#{activity.target.id}"
      }
    else
      {
        type: activity.target_type,
        id: activity.target_id,
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