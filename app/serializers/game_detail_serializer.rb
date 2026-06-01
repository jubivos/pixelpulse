class GameDetailSerializer
  def initialize(game)
    @game = game
  end

  def as_json
    {
      id: @game.id,
      title: @game.title,
      description: @game.description,
      specifications: @game.specifications,
      cover_image_url: @game.cover_image_url,
      release_date: @game.release_date,

      genres: @game.genres.map(&:name),
      tags: @game.tags.map(&:name),

      reviews_count: @game.reviews.size,
      average_rating: @game.reviews.average(:rating)&.to_f&.round(1),

      reviews: @game.reviews.map do |r|
        {
          id: r.id,
          rating: r.rating,
          content: r.content,
          user: {
            id: r.user.id,
            nickname: r.user.nickname
          }
        }
      end
    }
  end
end