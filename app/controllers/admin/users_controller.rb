module Admin
  class UsersController < ApplicationController
    before_action :authorize_admin!
    before_action :set_user, only: [:show, :destroy]

    def index
      users = User
        .includes(:role)
        .order(created_at: :desc)

      render json: ApiResponse.success(
        data: users.map { |user| serialize_user(user) }
      )
    end

    def show
      render json: ApiResponse.success(
        data: serialize_user_detail(@user)
      )
    end

    def destroy
      if @user.id == current_user.id
        return render json: ApiResponse.error(
          message: "Нельзя удалить самого себя",
          code: "CANNOT_DELETE_SELF"
        ), status: :unprocessable_entity
      end

      @user.destroy

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

    def set_user
      @user = User.find(params[:id])
    end

    def serialize_user(user)
      {
        id: user.id,
        login: user.login,
        nickname: user.nickname,
        email: user.email,
        role: user.role.name,
        created_at: user.created_at,
        last_activity_at: user.last_activity_at
      }
    end

    def serialize_user_detail(user)
      {
        user: serialize_user(user),

        stats: {
          reviews_count: user.reviews.count,
          comments_count: user.comments.count,
          likes_given_count: user.likes.count,
          news_count: user.news.count,
          activities_count: user.activities.count
        },

        latest_reviews: user.reviews.includes(:game).order(created_at: :desc).limit(5).map { |review|
          {
            id: review.id,
            game_id: review.game_id,
            game_title: review.game.title,
            rating: review.rating,
            status: review.status,
            content: review.content,
            created_at: review.created_at
          }
        },

        latest_comments: user.comments.order(created_at: :desc).limit(5).map { |comment|
          {
            id: comment.id,
            content: comment.content,
            commentable_type: comment.commentable_type,
            commentable_id: comment.commentable_id,
            created_at: comment.created_at
          }
        }
      }
    end
  end
end