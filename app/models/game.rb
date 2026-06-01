class Game < ApplicationRecord
    has_many :reviews, dependent: :destroy

    has_many :game_genres, dependent: :destroy
    has_many :genres, through: :game_genres

    has_many :game_tags, dependent: :destroy
    has_many :tags, through: :game_tags

    validates :title, presence: true
    scope :by_genre, ->(genre_name) {
        joins(:genres).where(genres: { name: genre_name }) if genre_name.present?
    }

    scope :by_tag, ->(tag_name) {
        joins(:tags).where(tags: { name: tag_name }) if tag_name.present?
    }

    scope :search, ->(query) {
        where("title ILIKE ?", "%#{query}%") if query.present?
    }

    scope :min_rating, ->(rating) {
        joins(:reviews)
        .group("games.id")
        .having("AVG(reviews.rating) >= ?", rating)
        if rating.present?
    }
    scope :sorted, ->(sort) {
        case sort
        when "rating"
            left_joins(:reviews)
            .group("games.id")
            .order("AVG(reviews.rating) DESC")
        when "newest"
            order(release_date: :desc)
        else
            order(created_at: :desc)
        end
    }
end