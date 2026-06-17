class GamesController < ApplicationController
  skip_before_action :authenticate_user_from_token!, only: [:index, :show]
  before_action :set_game, only: [:show, :update, :destroy]
  before_action :authorize_admin!, only: [:create, :update, :destroy]

  def index
    page = params[:page].to_i <= 0 ? 1 : params[:page].to_i
    per_page = params[:per_page].to_i <= 0 ? 10 : params[:per_page].to_i

    base = Game
      .by_genre(params[:genre])
      .by_tag(params[:tag])
      .search(params[:search])
      .min_rating(params[:min_rating])

    total = base.count

    games = base
      .includes(:genres, :tags, :reviews)
      .sorted(params[:sort])
      .offset((page - 1) * per_page)
      .limit(per_page)

    render json: ApiResponse.success(
      data: GameSerializer.new(games).as_json,
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

        reviews: @game.reviews.map { |r|
          {
            id: r.id,
            rating: r.rating,
            content: r.content,
            likes_count: r.likes.size,
            user: {
              id: r.user.id,
              nickname: r.user.nickname
            }
          }
        }
      }
    )
  end

  def create
    game = Game.new(game_params)

    if game.save
      render json: ApiResponse.success(data: game), status: :created
    else
      render json: ApiResponse.error(
        message: game.errors.full_messages.join(", ")
      ), status: :unprocessable_entity
    end
  end

  def update
    if @game.update(game_params)
      render json: ApiResponse.success(data: @game)
    else
      render json: ApiResponse.error(
        message: @game.errors.full_messages.join(", ")
      ), status: :unprocessable_entity
    end
  end

  def destroy
    @game.destroy
    head :no_content
  end

  private

  def set_game
    @game = Game
      .includes(:genres, :tags, reviews: :user)
      .find(params[:id])
  end

  def game_params
    params.require(:game).permit(
      :title,
      :description,
      :specifications,
      :cover_image_url,
      :release_date
    )
  end

  def authorize_admin!
    unless current_user&.role&.name == "admin"
      render json: ApiResponse.error(
        message: "Forbidden",
        code: "FORBIDDEN"
      ), status: :forbidden
    end
  end
end