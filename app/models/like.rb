class Like < ApplicationRecord
  belongs_to :user
  belongs_to :likeable, polymorphic: true

  validates :user_id, uniqueness: {
    scope: [:likeable_type, :likeable_id]
  }

  after_create :create_activity
  after_create :create_notification

  private

  def create_activity
    Activity.create!(
      user: user,
      action: "like",
      target: likeable
    )
  end

  def create_notification
    return unless likeable.respond_to?(:user_id)
    return if likeable.user_id == user_id

    Notification.create!(
      user_id: likeable.user_id,
      actor: user,
      action: "liked",
      notifiable: likeable
    )
  end
end