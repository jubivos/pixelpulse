module Admin
  class NewsController < ApplicationController
    before_action :authorize_admin!
    before_action :set_news, only: [:destroy]

    def index
      news = News
        .includes(:user)
        .order(created_at: :desc)

      render json: ApiResponse.success(
        data: news.map { |item| serialize_news(item) }
      )
    end

    def destroy
      @news.destroy

      render json: ApiResponse.success(
        data: {
          deleted: true
        }
      )
    end

    private

    def authorize_admin!
      return if current_user&.admin?

      render json: ApiResponse.error(
        message: "Forbidden",
        code: "FORBIDDEN"
      ), status: :forbidden
    end

    def set_news
      @news = News.find(params[:id])
    end

    def serialize_news(news)
      {
        id: news.id,
        title: news.title,
        content: news.content,
        author: news.user.nickname,
        published_at: news.published_at,
        created_at: news.created_at,
        comments_count: news.comments.count,
        likes_count: news.likes.count
      }
    end
  end
end