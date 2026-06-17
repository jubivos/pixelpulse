module Admin
  class GamesController < ApplicationController
    before_action :authorize_admin!
    before_action :set_game, only: [:destroy]

    def index
      games = Game
        .includes(:genres, :tags, :reviews)
        .order(created_at: :desc)

      render json: ApiResponse.success(
        data: games.map { |game| serialize_game(game) }
      )
    end

    def destroy
      @game.destroy

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

    def set_game
      @game = Game.find(params[:id])
    end

    def serialize_game(game)
      {
        id: game.id,
        title: game.title,
        description: game.description,
        release_date: game.release_date,
        genres: game.genres.map(&:name),
        tags: game.tags.map(&:name),
        reviews_count: game.reviews.size,
        average_rating: game.reviews.average(:rating)&.to_f&.round(1)
      }
    end
  end
end