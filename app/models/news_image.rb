class NewsImage < ApplicationRecord
    belongs_to :news

    validates :image_url, presence: true
end
