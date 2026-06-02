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

      subject: serialize_subject(activity)
    }
  end

  def serialize_subject(activity)
    case activity.subject
    when Review
      {
        type: "Review",
        id: activity.subject.id,
        content: activity.subject.content,
        game_id: activity.subject.game_id
      }
    when News
      {
        type: "News",
        id: activity.subject.id,
        title: activity.subject.title
      }
    else
      {
        type: activity.subject_type,
        id: activity.subject_id
      }
    end
  end
end