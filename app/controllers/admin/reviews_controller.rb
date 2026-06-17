module Admin
  class ReviewsController < ApplicationController
    before_action :authorize_admin!
    before_action :set_review, only: [:destroy]

    def index
      reviews = Review
        .includes(:user, :game)
        .order(created_at: :desc)

      render json: ApiResponse.success(
        data: reviews.map { |review| serialize_review(review) }
      )
    end

    def destroy
      @review.destroy

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

    def set_review
      @review = Review.find(params[:id])
    end

    def serialize_review(review)
      {
        id: review.id,
        content: review.content,
        rating: review.rating,
        status: review.status,
        created_at: review.created_at,

        user: {
          id: review.user.id,
          nickname: review.user.nickname
        },

        game: {
          id: review.game.id,
          title: review.game.title
        }
      }
    end
  end
end