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

    validates :rating, presence: true
    validates :user_id, uniqueness: { scope: :game_id }
    validates :rating, inclusion: { in: 1..10 }
end