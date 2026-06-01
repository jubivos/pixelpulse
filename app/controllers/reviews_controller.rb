class ReviewsController < ApplicationController
  before_action :set_review, only: [:show, :update, :destroy]

  before_action :authenticate_user_from_token!,
                only: [:create, :update, :destroy]

  before_action :authorize_owner_or_admin!,
                only: [:update, :destroy]

  def index
    reviews = Review.includes(:user, :game)

    render json: reviews.map { |r|
      {
        id: r.id,
        rating: r.rating,
        content: r.content,
        user: r.user.nickname,
        game: r.game.title
      }
    }
  end

  def show
    render json: {
      id: @review.id,
      rating: @review.rating,
      content: @review.content,
      status: @review.status,

      user: {
        id: @review.user.id,
        nickname: @review.user.nickname
      },

      game: {
        id: @review.game.id,
        title: @review.game.title
      }
    }
  end

  def create
    review = current_user.reviews.build(review_params)

    if review.save
      render json: review, status: :created
    else
      render json: review.errors, status: :unprocessable_entity
    end
  end

  def update
    if @review.update(review_params)
      render json: @review
    else
      render json: @review.errors, status: :unprocessable_entity
    end
  end

  
  def destroy
    @review.destroy
    head :no_content
  end

  private

  def set_review
    @review = Review.find(params[:id])
  end

  def review_params
    params.require(:review).permit(
      :game_id,
      :rating,
      :content
    )
  end

  def authorize_owner_or_admin!
    return if @review.user_id == current_user.id
    return if current_user.role.name == "admin"

    render json: { error: "Forbidden" }, status: :forbidden
  end
end