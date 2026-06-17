class NotificationsController < ApplicationController
  before_action :authenticate_user_from_token!

  def index
    notifications = current_user.notifications
      .includes(:actor, :notifiable)
      .order(created_at: :desc)

    render json: ApiResponse.success(
      data: NotificationSerializer.new(notifications).as_json
    )
  end

  def mark_as_read
    notification = current_user.notifications.find(params[:id])
    notification.update(read: true)

    render json: ApiResponse.success(
      data: {
        read: true
      }
    )
  end
end