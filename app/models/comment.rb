class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :commentable, polymorphic: true

  belongs_to :parent, class_name: "Comment", optional: true

  has_many :replies,
           class_name: "Comment",
           foreign_key: "parent_id",
           dependent: :destroy

  scope :root, -> { where(parent_id: nil) }

  validates :content, presence: true

  validate :no_self_parent
  validate :max_depth

  after_create :create_activity
  after_create :create_notification

  private

  def no_self_parent
    return if parent_id.blank? || id.blank?

    errors.add(:parent_id, "cannot be self") if parent_id == id
  end

  def max_depth
    return if parent_id.blank?

    depth = 0
    current = parent

    while current
      depth += 1
      current = current.parent
    end

    errors.add(:base, "Max comment depth reached") if depth >= 3
  end

  def create_activity
    Activity.create!(
      user: user,
      action: "comment",
      target: commentable
    )
  end

  def create_notification
    return unless commentable.respond_to?(:user_id)
    return if commentable.user_id == user_id

    Notification.create!(
      user_id: commentable.user_id,
      actor: user,
      action: "commented",
      notifiable: self
    )
  end
end