class ApplicationController < ActionController::API
  before_action :authenticate_user_from_token!
  after_action :track_user_activity

  rescue_from ActiveRecord::RecordNotFound do
    render json: ApiResponse.error(
      message: "Resource not found",
      code: "NOT_FOUND"
    ), status: :not_found
  end

  rescue_from ActiveRecord::RecordInvalid do |e|
    render json: ApiResponse.error(
      message: e.record.errors.full_messages.join(", "),
      code: "VALIDATION_ERROR"
    ), status: :unprocessable_entity
  end

  attr_reader :current_user

  private

  def authenticate_user_from_token!
    token = request.headers["Authorization"]&.split(" ")&.last
    @current_user = User.find_by(auth_token: token)

    return if @current_user

    render json: ApiResponse.error(
      message: "Unauthorized",
      code: "UNAUTHORIZED"
    ), status: :unauthorized

    false
  end

  def track_user_activity
    return unless current_user
    return unless response.successful?

    current_user.update_column(:last_activity_at, Time.current)
  end
end