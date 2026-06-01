class GameSerializer
  def initialize(games)
    @games = games
  end

  def as_json
    if @games.is_a?(Enumerable)
      @games.map { |game| serialize(game) }
    else
      serialize(@games)
    end
  end

  private

  def serialize(game)
    {
      id: game.id,
      title: game.title,
      description: game.description,
      cover_image_url: game.cover_image_url,
      release_date: game.release_date,

      genres: game.genres.map(&:name),
      tags: game.tags.map(&:name),

      reviews_count: game.reviews.size
    }
  end
end