class Game < ApplicationRecord
    has_many :reviews, dependent: :destroy

    has_many :game_genres, dependent: :destroy
    has_many :genres, through: :game_genres

    has_many :game_tags, dependent: :destroy
    has_many :tags, through: :game_tags

    validates :title, presence: true
end