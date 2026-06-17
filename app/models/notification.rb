class Notification < ApplicationRecord
  belongs_to :user
  belongs_to :actor, class_name: "User"
  belongs_to :notifiable, polymorphic: true

  scope :latest, -> { order(created_at: :desc) }
  scope :unread, -> { where(read: false) }

  validates :action, presence: true
end