module Admin
  class CommentsController < ApplicationController
    before_action :authorize_admin!
    before_action :set_comment, only: [:destroy]

    def index
      comments = Comment
        .includes(:user)
        .order(created_at: :desc)

      render json: ApiResponse.success(
        data: comments.map { |comment| serialize_comment(comment) }
      )
    end

    def destroy
      @comment.destroy

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

    def set_comment
      @comment = Comment.find(params[:id])
    end

    def serialize_comment(comment)
      {
        id: comment.id,
        content: comment.content,
        commentable_type: comment.commentable_type,
        commentable_id: comment.commentable_id,
        created_at: comment.created_at,

        user: {
          id: comment.user.id,
          nickname: comment.user.nickname
        },

        target: serialize_target(comment)
      }
    end

    def serialize_target(comment)
      case comment.commentable
      when News
        {
          title: comment.commentable.title,
          url: "/news/#{comment.commentable.id}"
        }
      when Review
        {
          title: comment.commentable.game.title,
          url: "/games/#{comment.commentable.game_id}"
        }
      else
        {
          title: "#{comment.commentable_type} ##{comment.commentable_id}",
          url: "#"
        }
      end
    end
  end
end