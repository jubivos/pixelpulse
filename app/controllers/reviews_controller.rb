class ReviewsController < ApplicationController
  skip_before_action :authenticate_user_from_token!, only: [:index, :show]

  before_action :set_review, only: [:show, :update, :destroy]
  before_action :authenticate_user_from_token!, only: [:create, :update, :destroy]
  before_action :authorize_review_owner!, only: [:update, :destroy]


  def index
    page = params[:page].to_i <= 0 ? 1 : params[:page].to_i
    per_page = params[:per_page].to_i <= 0 ? 10 : params[:per_page].to_i

    base = Review
      .where(game_id: params[:game_id])
      .includes(:user, :likes)

    total = base.count

    reviews = base
      .offset((page - 1) * per_page)
      .limit(per_page)

    render json: ApiResponse.success(
      data: ReviewSerializer.new(reviews).as_json,
      meta: {
        page: page,
        per_page: per_page,
        total: total,
        total_pages: (total.to_f / per_page).ceil
      }
    )
  end


  def show
    render json: ApiResponse.success(
      data: {
        id: @review.id,
        rating: @review.rating,
        content: @review.content,
        created_at: @review.created_at,

        user: {
          id: @review.user.id,
          nickname: @review.user.nickname
        },

        game: {
          id: @review.game.id,
          title: @review.game.title
        },

        likes_count: @review.likes.size,

        comments: CommentSerializer.new(
          @review.comments.root.includes(:user, replies: :user)
        ).as_json
      }
    )
  end


  def create
    review = current_user.reviews.build(review_params)

    if Review.exists?(user_id: current_user.id, game_id: review.game_id)
      return render json: ApiResponse.error(
        message: "You already reviewed this game"
      ), status: :unprocessable_entity
    end

    if review.save
      render json: ApiResponse.success(data: review), status: :created
    else
      render json: ApiResponse.error(
        message: review.errors.full_messages.join(", ")
      ), status: :unprocessable_entity
    end
  end

  def update
    if @review.update(review_params)
      render json: ApiResponse.success(data: @review)
    else
      render json: ApiResponse.error(
        message: @review.errors.full_messages.join(", ")
      ), status: :unprocessable_entity
    end
  end


  def destroy
    @review.destroy
    head :no_content
  end


  private

  def set_review
    @review = Review
      .includes(:user, :game, :likes, comments: [:user, :replies])
      .find(params[:id])
  end

  def review_params
    params.require(:review).permit(
      :game_id,
      :rating,
      :content
    )
  end

  def authorize_review_owner!
    unless @review.user_id == current_user.id || current_user&.role&.name == "admin"
      render json: ApiResponse.error(
        message: "Forbidden",
        code: "FORBIDDEN"
      ), status: :forbidden
    end
  end
end