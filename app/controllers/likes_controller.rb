class LikesController < ApplicationController
  before_action :authenticate_user_from_token!

  def toggle
    likeable_type = params[:likeable_type]
    likeable_id = params[:likeable_id]


    unless %w[News Review].include?(likeable_type)
      return render json: ApiResponse.error(
        message: "Invalid likeable type"
      ), status: :unprocessable_entity
    end

    like = Like.find_by(
      user_id: current_user.id,
      likeable_type: likeable_type,
      likeable_id: likeable_id
    )

    if like
      like.destroy

      render json: ApiResponse.success(
        data: {
          liked: false
        }
      )
    else
      like = current_user.likes.build(
        likeable_type: likeable_type,
        likeable_id: likeable_id
      )

      if like.save
        render json: ApiResponse.success(
          data: {
            liked: true
          }
        )
      else
        render json: ApiResponse.error(
          message: like.errors.full_messages.join(", ")
        ), status: :unprocessable_entity
      end
    end
  end
end