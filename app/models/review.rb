class Review < ApplicationRecord
    belongs_to :user
    belongs_to :game

    has_many :comments, as: :commentable, dependent: :destroy
    has_many :likes, as: :likeable, dependent: :destroy

    enum status: {
    draft: "draft",
    moderated: "moderated",
    published: "published"
    }

    after_create :create_activity


    private
    
    return if likeable.user_id == user_id

    Activity.create!(
        user: user,
        action: "user.created.review",
        target: self
    )
    validates :rating, presence: true
    validates :user_id, uniqueness: { scope: :game_id }
    validates :rating, inclusion: { in: 1..10 }
end