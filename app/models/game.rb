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
        if rating.present?
            joins(:reviews)
            .group("games.id")
            .having("AVG(reviews.rating) >= ?", rating)
        else
            all
        end
    }
    scope :sorted, ->(sort) {
        case sort
        when "rating_desc"
            joins(:reviews)
                .group("games.id")
                .order("AVG(reviews.rating) DESC")
        when "rating_asc"
            joins(:reviews)
                .group("games.id")
                .order("AVG(reviews.rating) ASC")
        else
            order(created_at: :desc)
        end
    }
end