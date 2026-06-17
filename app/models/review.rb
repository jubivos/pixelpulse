class Review < ApplicationRecord
  belongs_to :user
  belongs_to :game

  has_many :comments, as: :commentable, dependent: :destroy
  has_many :likes, as: :likeable, dependent: :destroy

    enum :status, {
        draft: "draft",
        moderated: "moderated",
        published: "published"
    }

  after_create :create_activity

  validates :rating, presence: true
  validates :rating, inclusion: { in: 1..10 }
  validates :user_id, uniqueness: { scope: :game_id }

  private

    def create_activity
        Activity.create!(
            user: user,
            action: "create_review",
            target: self
        )
    end
end