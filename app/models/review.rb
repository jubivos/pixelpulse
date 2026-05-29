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
end