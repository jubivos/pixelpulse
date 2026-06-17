module Admin
  class DashboardController < ApplicationController
    before_action :authorize_admin!

    def show
      render json: ApiResponse.success(
        data: {
          stats: {
            users_count: User.count,
            news_count: News.count,
            games_count: Game.count,
            reviews_count: Review.count,
            comments_count: Comment.count,
            likes_count: Like.count
          },

          latest_users: User
            .includes(:role)
            .order(created_at: :desc)
            .limit(5)
            .map { |user| serialize_user(user) },

          latest_news: News
            .includes(:user)
            .order(created_at: :desc)
            .limit(5)
            .map { |news| serialize_news(news) },

          latest_reviews: Review
            .includes(:user, :game)
            .order(created_at: :desc)
            .limit(5)
            .map { |review| serialize_review(review) },

          latest_comments: Comment
            .includes(:user)
            .order(created_at: :desc)
            .limit(5)
            .map { |comment| serialize_comment(comment) }
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

    def serialize_user(user)
      {
        id: user.id,
        login: user.login,
        nickname: user.nickname,
        email: user.email,
        role: user.role.name,
        created_at: user.created_at
      }
    end

    def serialize_news(news)
      {
        id: news.id,
        title: news.title,
        author: news.user.nickname,
        published_at: news.published_at,
        created_at: news.created_at
      }
    end

    def serialize_review(review)
      {
        id: review.id,
        game_id: review.game_id,
        game_title: review.game.title,
        user: review.user.nickname,
        rating: review.rating,
        status: review.status,
        created_at: review.created_at
      }
    end

    def serialize_comment(comment)
      {
        id: comment.id,
        user: comment.user.nickname,
        content: comment.content,
        commentable_type: comment.commentable_type,
        commentable_id: comment.commentable_id,
        created_at: comment.created_at
      }
    end
  end
end