class ApplicationController < ActionController::API
  rescue_from ActiveRecord::RecordNotFound, with: :not_found
  rescue_from ActiveRecord::RecordInvalid, with: :record_invalid

  private

  def not_found
    render json: {
      error: {
        code: "NOT_FOUND",
        message: "Resource not found"
      }
    }, status: :not_found
  end

  def record_invalid(e)
    render json: {
      error: {
        code: "VALIDATION_ERROR",
        message: e.record.errors.full_messages.join(", ")
      }
    }, status: :unprocessable_entity
  end
end