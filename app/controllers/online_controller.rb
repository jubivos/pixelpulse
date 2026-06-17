class OnlineController < ApplicationController
  skip_before_action :authenticate_user_from_token!, only: [:show]
  skip_after_action :track_user_activity, only: [:show]

  def show
    count = User.where("last_activity_at >= ?", 5.minutes.ago).count

    render json: ApiResponse.success(
      data: {
        count: count
      }
    )
  end
end