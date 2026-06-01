class News < ApplicationRecord
    belongs_to :user

    has_many :news_images, dependent: :destroy
    has_many :comments, as: :commentable, dependent: :destroy
    has_many :likes, as: :likeable, dependent: :destroy

    validates :title, presence: true
    scope :latest, -> {
        order(published_at: :desc)
    }

    scope :popular, -> {
        left_joins(:likes)
            .group("news.id")
            .order("COUNT(likes.id) DESC")
    }

    scope :sorted, ->(sort) {
        case sort
        when "popular"
            popular
        else
            latest
        end
    }
end