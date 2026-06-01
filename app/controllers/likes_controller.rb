class LikesController < ApplicationController
  before_action :authenticate_user_from_token!

  def create
    like = current_user.likes.build(like_params)

    if like.save
      render json: like_response(like), status: :created
    else
      render json: like.errors, status: :unprocessable_entity
    end
  end

  def destroy
    like = current_user.likes.find_by(
      likeable_type: params[:likeable_type],
      likeable_id: params[:likeable_id]
    )

    return render json: { error: "Not found" }, status: :not_found unless like

    like.destroy
    head :no_content
  end

  private

  def like_params
    params.require(:like).permit(
      :likeable_type,
      :likeable_id
    )
  end

  def like_response(like)
    {
      id: like.id,
      likeable_type: like.likeable_type,
      likeable_id: like.likeable_id,
      user_id: like.user_id
    }
  end
end