class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :commentable, polymorphic: true

  belongs_to :parent, class_name: "Comment", optional: true

  has_many :replies,
           class_name: "Comment",
           foreign_key: "parent_id",
           dependent: :destroy

  # scopes
  scope :root, -> { where(parent_id: nil) }


  after_create :create_notification
  after_create :create_activity

  private

  Activity.create!(
    user: user,
    action: "user.commented.#{commentable_type.downcase}",
    target: commentable
  )

  # validations
  validates :content, presence: true

  validate :no_self_parent
  validate :max_depth


  def create_notification
    return if commentable.user_id == user_id

    Notification.create!(
      user_id: commentable.user_id,
      actor: user,
      action: "commented",
      notifiable: self
    )
  end

  def no_self_parent
    errors.add(:parent_id, "cannot be self") if parent_id == id
  end

  def max_depth
    depth = 0
    current = parent

    while current
      depth += 1
      current = current.parent
    end

    if depth >= 3
      errors.add(:base, "Max comment depth reached")
    end
  end
end