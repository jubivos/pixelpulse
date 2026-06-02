class ActivitiesController < ApplicationController
  skip_before_action :authenticate_user_from_token!, only: [:index]

  def index
    page = params[:page].to_i <= 0 ? 1 : params[:page].to_i
    per_page = params[:per_page].to_i <= 0 ? 20 : params[:per_page].to_i

    base = Activity.includes(:user, :subject).latest

    total = base.count

    activities = base
      .offset((page - 1) * per_page)
      .limit(per_page)

    render json: ApiResponse.success(
      data: ActivitySerializer.new(activities).as_json,
      meta: {
        page: page,
        per_page: per_page,
        total: total,
        total_pages: (total.to_f / per_page).ceil
      }
    )
  end
end