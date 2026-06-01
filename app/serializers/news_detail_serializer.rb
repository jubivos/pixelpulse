class NewsDetailSerializer
  def initialize(news)
    @news = news
  end

  def as_json
    {
      id: @news.id,
      title: @news.title,
      content: @news.content,

      images: @news.news_images
        .sort_by(&:position)
        .map do |img|
          {
            url: img.image_url,
            is_cover: img.is_cover
          }
        end,

      author: {
        id: @news.user.id,
        nickname: @news.user.nickname
      },

      likes_count: @news.likes.size,
      published_at: @news.published_at
    }
  end
end