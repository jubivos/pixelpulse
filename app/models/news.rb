class News < ApplicationRecord
    belongs_to :user

    has_many :news_images, dependent: :destroy
    has_many :comments, as: :commentable, dependent: :destroy
    has_many :likes, as: :likeable, dependent: :destroy

    validates :title, presence: true
end