class Like < ApplicationRecord
    belongs_to :user
    belongs_to :likeable, polymorphic: true



    after_create :create_activity
    after_create :create_notification

    private

    Activity.create!(
        user: user,
        action: "user.liked.#{likeable_type.downcase}",
        target: likeable
    )

    def create_notification
    return if likeable.user_id == user_id

    Notification.create!(
        user_id: likeable.user_id,
        actor: user,
        action: "liked",
        notifiable: likeable
    )
    end

    validates :user_id, uniqueness: { scope: [:likeable_type, :likeable_id] }
end