class NewsSerializer
  def initialize(news)
    @news = news
  end

  def as_json
    if @news.is_a?(Enumerable)
      @news.map { |n| serialize(n) }
    else
      serialize(@news)
    end
  end

  private

  def serialize(n)
    {
      id: n.id,
      title: n.title,
      content: n.content,

      cover_image_url: cover_image(n),

      author: {
        id: n.user.id,
        nickname: n.user.nickname
      },

      published_at: n.published_at,

      likes_count: n.likes.size,
      comments_count: n.comments.size
    }
  end

  def cover_image(n)
    n.news_images.find(&:is_cover)&.image_url
  end
end